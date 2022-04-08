const User = require('../models/user')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
require('dotenv').config()

const sign_up = async (request, response, next) => {
  const body = request.body

  //hash password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  //creates a User model like object
  const user = new User({
    email: body.email,
    username: body.username,
    password: passwordHash,
    likedPosts: []
  })

  try {
    //saves user
    const savedUser = await user.save()
    const token = getToken(savedUser)
    const id = savedUser._id
    response.status(201).json({success: true, message: 'Signed up!', token, id})
  } catch (error) {
    response.status(500).json({success: false, error: error.message})
  }
}

const login = async (request, response, next) => {
  const { email, password } = request.body

  if(!email || !password){
    response.status(400).json({success: false, error: "Email and password required."})
  }

  try {
    //email must be unique so "findOne" works well
    const user = await User.findOne({ email })
    if(!user){
      console.log('email does not match any users')
      return response.status(404).json({success: false, error: 'Invalid credentials'})
    }

    //check if password is correct
    const passwordsMatching = await bcrypt.compare(password, user.password)
    
    if(!passwordsMatching){
      return response.status(404).json({success: false, error: 'Invalid password'})
    }
    
    //get the token after succesfull login
    const token = getToken(user)
    const id = user._id

    response.status(201).json({success: true, message: 'Login successful', token, id})

  } catch (error) {
    response.status(500).json({success: false, error: error.message})
  }
}

//signs token and sends it back
const getToken = (user) => {
  return JWT.sign({id: user.__id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES})
}

module.exports = {
  sign_up, login
}