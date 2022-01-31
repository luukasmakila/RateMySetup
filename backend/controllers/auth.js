const User = require('../models/user')

const sign_up = async (request, response, next) => {
  const body = request.body

  const user = new User({
    email: body.email,
    username: body.username,
    password: body.password
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