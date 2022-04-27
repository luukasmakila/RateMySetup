const Post = require('../models/post')
const User = require('../models/user')
const express = require('express')
const privateRouter = express.Router()
const Multer = require('multer')
const fs = require('fs')
const JWT = require('jsonwebtoken')
require('dotenv').config()
const {Storage} = require('@google-cloud/storage')
const path = require('path')

//config multer
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits : {
    fileSize: 5 * 1024 * 1024
  }
})

//connect to google cloud
const storage = new Storage({
  keyFilename: path.join(__dirname, '../ratemysetup-47737e5e2173.json'),
  projectId: 'ratemysetup'
})

//google cloud bucket
const rateMySetupBucket = storage.bucket('ratemysetup-bucket')

//create a new post
privateRouter.post('/create-post', multer.single('setupImage'), async (request, response, next) => {

  if(!request.file) return response.status(400).json({success: false, message: 'no file uploaded'})

  const user = await User.findById(request.headers.authorization)
  if(!user) return response.status(401).json({success: false, message: 'unauthorized request'})

  //upload image to google cloud storage
  try {
    const blob = rateMySetupBucket.file(request.file.originalname)
    const blobStream = blob.createWriteStream()

    blobStream.on('finish',() => {
      console.log('image upload successfull')
    })
    blobStream.end(request.file.buffer)
  } catch (error) {
    response.status(400).json({success: false, message: 'failed to create the post.'})
  }

  const newPost = new Post({
    bio: request.body.bio,
    setupImage: request.file.originalname,
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
    const post = await newPost.save()
    user.posts = user.posts.concat(post)
    await user.save()
    response.status(201).json({success: true, message: 'post created!'})
  } catch (error) {
    response.status(400).json({success: false, message: 'failed to create the post.'})
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

  //delete image from google storage and post info from MongoDB
  try {
    await storage.bucket('ratemysetup-bucket').file(imageName).delete()
    await Post.findByIdAndDelete(id)
    response.status(200).json({success: true, message: 'post deleted!'}) 
  } catch (error) {
    response.status(404).json({success: false, message: 'post not found.'})
  }
})

module.exports = privateRouter