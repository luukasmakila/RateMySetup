const Post = require('../models/post')
const User = require('../models/user')
const express = require('express')
const privateRouter = express.Router()
const multer = require('multer')

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
//because we are using multer the routes have to be defined here...
privateRouter.post('/create-post', upload.single('setupImage'), async (request, response, next) => {
  const user = await User.findById(request.headers.authorization)

  if(!user) return response.status(400).json({success: false, message: 'unauthorized request'})

  const newPost = new Post({
    bio: request.body.bio,
    setupImage: request.file.originalname,
    title: request.body.title,
    author: user.username,
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

module.exports = privateRouter