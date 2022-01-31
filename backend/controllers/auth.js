

const sign_up = async (request, response, next) => {
  console.log('sign-up')
}

const login = async (request, response, next) => {
  console.log(request.body)
  return response.status(201).json({success: true})
}

module.exports = {
  sign_up, login
}