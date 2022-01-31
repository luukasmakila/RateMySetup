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
  console.log(request.body)
  return response.status(201).json({success: true})
}

module.exports = {
  sign_up, login
}