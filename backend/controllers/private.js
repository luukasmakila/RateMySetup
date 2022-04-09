const Post = require('../models/post')
const User = require('../models/user')
const express = require('express')
const privateRouter = express.Router()
const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../frontend/public/uploads/')
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
})

//upload image to uploads folder
const upload = multer({storage: storage})

//create a new post
privateRouter.post('/create-post', upload.single('setupImage'), async (request, response, next) => {
  const user = await User.findById(request.headers.authorization)

  if(!user) return response.status(400).json({success: false, message: 'unauthorized request'})

  const newPost = new Post({
    bio: request.body.bio,
    setupImage: request.file.originalname,
    title: request.body.title,
    author: user.username,
    likes: 0,
    dislikes: 0,
    likers: [],
    dislikers: [],
    user: user._id
  })

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

///get a single post
privateRouter.get('/posts/:id', async (request, response, next) => {
  const post = await Post.findById(request.params.id)
  console.log(post)
  response.json(post.toJSON())
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
  const post = await Post.findById(id)
  const imageName = post.setupImage
  const pathToImage = '../frontend/public/uploads/' + imageName
  try {
    fs.unlink(pathToImage, (err) => {
      if(err) console.log(err)
    })
    await Post.findByIdAndDelete(id)
    response.status(200).json({success: true, message: 'post deleted!'}) 
  } catch (error) {
    console.log(error)
  }
})

module.exports = privateRouter