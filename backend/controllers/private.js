const Post = require('../models/post')
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
privateRouter.post('/create-post', upload.single('setupImage'), async (request, response, next) => {
  const newPost = new Post({
    bio: request.body.bio,
    setupImage: request.file.originalname
  })

  try {
    const result = await newPost.save()
    console.log(result)
  } catch (error) {
    console.log(error)
  }
})

//get all posts
privateRouter.get('/posts', async (request, response, next) => {
  const posts = await Post.find({})
  response.json(posts.map(post => post.toJSON()))
})

module.exports = privateRouter