const { Router } = require('express');
const authRouter = Router()
const userExtractor = require('../middleware/userExtractor')

// traigo los handlers

const { loginHandler,registerHandler, updateHandler, getUsers } = require('../controllers/handlersUser/authHandler')

// rutas

authRouter.get('/users', getUsers)
authRouter.post('/login', loginHandler)
authRouter.post('/register', registerHandler)
authRouter.put('/userUpdate', userExtractor, updateHandler)


module.exports = authRouter