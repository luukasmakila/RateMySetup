const User = require('../models/user')
const bcrypt = require('bcrypt')

const sign_up = async (request, response, next) => {
  const body = request.body

  //HASH PASSWORDS HERE
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    email: body.email,
    username: body.username,
    password: passwordHash
  })

  try {
    await user.save()
    response.status(201).json({success: true})
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
    const user = await User.findOne({ email })
    if(!user){
      console.log('email does not match any users')
      return response.status(404).json({success: false, error: 'Invalid credentials'})
    }
    const passwordsMatching = await bcrypt.compare(password, user.password)
    console.log(passwordsMatching)
    if(!passwordsMatching){
      return response.status(404).json({success: false, error: 'Invalid password'})
    }
    response.status(201).json({success: false, message: 'Login successful'})
  } catch (error) {
    console.log(error)
    response.status(500).json({success: false, error: error.message})
  }
}

module.exports = {
  sign_up, login
}