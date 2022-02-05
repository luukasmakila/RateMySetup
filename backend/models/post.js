const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  setupImage: { type: String, required: true },
  postDate: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Post', postSchema)