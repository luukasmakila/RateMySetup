const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const postSchema = new mongoose.Schema({
  title: { type : String, required: true },
  bio: { type: String, required: true },
  setupImage: { type: String, required: true, unique:true },
  author: { type: String, required: true},
  likes: { type: Number },
  dislikes: { type: Number },
  likers: { type: Array },
  dislikers: { type: Array },
  postDate: { type: Date, default: Date.now() },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

postSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Post', postSchema)