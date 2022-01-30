const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const cors = require('cors')

//APP CONFIG
const app = express()
const PORT = process.env.PORT || 3001
const MONGO_URI = process.env.MONGO_URI

//MIDDLEWARES
app.use(express.json())
app.use(cors())

//DB CONFIG
console.log('connecting to MongoDB')
mongoose.connect(MONGO_URI)
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('Failed to connect to MongoDB')
})

//API ENDPOINTS
app.use('/api/auth', authRouter)

//LISTENER
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})