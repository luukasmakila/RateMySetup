const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  setupImage: { type: String, required: true },
  postDate: { type: Date, default: Date.now() },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Post', postSchema)