const { Router } = require('express');
const authRouter = Router()
const userExtractor = require('../middleware/userExtractor')

// traigo los handlers

const { loginHandler,registerHandler, updateHandler, getUsers } = require('../controllers/handlersUser/authHandler')

// rutas

authRouter.post('/login', loginHandler)
authRouter.post('/register', registerHandler)
authRouter.post('/userUpdate', userExtractor, updateHandler)

module.exports = authRouter