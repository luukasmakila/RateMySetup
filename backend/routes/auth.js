const express = require('express')
const authRouter = express.Router()

const { sign_up, login } = require('../controllers/auth')

authRouter.route('/sign-up').post(sign_up)
authRouter.route('/login').post(login)

module.exports = authRouter