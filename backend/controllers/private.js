const express = require('express')

const Post = require('../models/post')
const User = require('../models/user')

const privateRouter = express.Router()
const multer = require('multer')
const JWT = require('jsonwebtoken')

require('dotenv').config()

const fs = require("fs")
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)


const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3({
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey
  }
})

//config multer
const upload = multer({ dest: 'uploads/' })

const uploadToS3 = (file) => {
  const fileStream = fs.readFileSync(file.path)
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.originalname
  }
  return s3.upload(uploadParams).promise()
}

//create a new post
privateRouter.post('/create-post', upload.single('setupImage'), async (request, response, next) => {
  const file = request.file
  if(!file) return response.status(400).json({success: false, message: 'no file uploaded'})

  const user = await User.findById(request.headers.authorization)
  if(!user) return response.status(401).json({success: false, message: 'unauthorized request'})

  //upload image to AWS S3
  try {
    await uploadToS3(file)
    await unlinkFile(file.path)
  } catch (error) {
    response.status(400).json({success: false, message: 'failed to upload post photo.', reason: error.message})
  }

  const newPost = new Post({
    bio: request.body.bio,
    setupImage: file.originalname,
    title: request.body.title,
    author: user.username,
    likes: 0,
    dislikes: 0,
    likers: [],
    dislikers: [],
    user: user._id.toString()
  })

  //upload post to MongoDB
  try {
    const post = await newPost.save({validateModifiedOnly: true})
    user.posts = user.posts.concat(post)
    await user.save({validateModifiedOnly: true})
    response.status(201).json({success: true, message: 'post created!'})
  } catch (error) {
    response.status(400).json({success: false, message: 'failed to create the post.', reason: error.message})
  }
})

//get all posts
privateRouter.get('/posts', async (request, response, next) => {
  const posts = await Post.find({})
  response.json(posts.map(post => post.toJSON()))
})

//add like / dislike
privateRouter.put('/posts/:id', async (request, response, next) => {
  const id = request.params.id
  const updatedPost = request.body
  await Post.findByIdAndUpdate(id, updatedPost)
  response.status(200).json({success: true, message: 'post liked!'})
})

privateRouter.delete('/posts/:id', async (request, response, next) => {
  const id = request.params.id
  const authToken = request.headers.authorization
  const decodedJWT = JWT.verify(authToken, process.env.JWT_SECRET)
  const userId = decodedJWT.id
  const post = await Post.findById(id)

  //if user is not the creator of the post
  if(userId !== post.user.toString()) return response.status(401).json({success: false, message: 'unauthorized request'})

  const imageName = post.setupImage

  //delete image from s3 and post info from MongoDB
  try {
    await s3.deleteObject({Bucket: bucketName, Key: imageName}).promise()
    await Post.findByIdAndDelete(id)
    response.status(200).json({success: true, message: 'post deleted!'}) 
  } catch (error) {
    response.status(404).json({success: false, message: 'post not found.'})
  }
})

module.exports = privateRouter