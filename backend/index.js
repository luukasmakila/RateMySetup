const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')

//APP CONFIG
const app = express()
const PORT = process.env.PORT || 3001
const MONGO_URI = process.env.MONGO_URI

//MIDDLEWARES

//DB CONFIG
console.log('connecting to MongoDB')
mongoose.connect(MONGO_URI)
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('Failed to connect to MongoDB')
  })

//LISTENER
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})