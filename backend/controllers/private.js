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

const upload = multer({storage: storage})

privateRouter.post('/create-post', upload.single('setupImage'), async (request, response, next) => {
  
  console.log(request.body)
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

module.exports = privateRouter