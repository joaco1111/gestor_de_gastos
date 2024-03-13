const { Router } = require('express');
const authRouter = Router()

// traigo los handlers

const { loginHandler,registerHandler } = require('../handlers/authHandler')

// rutas

authRouter.post('/login', loginHandler)
authRouter.post('/register', registerHandler)

module.exports = authRouter