const { Router } = require('express');
const authRouter = Router()

// traigo los handlers

const { loginHandler,registerHandler, updateHandler, getUsers } = require('../controllers/handlersUser/authHandler')

// rutas

authRouter.post('/login', loginHandler)
authRouter.post('/register', registerHandler)
authRouter.get('/users', getUsers)
authRouter.put('/userUpdate/:id', updateHandler)

module.exports = authRouter