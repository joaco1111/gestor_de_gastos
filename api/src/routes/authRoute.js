const { Router } = require('express');
const authRouter = Router()
const userExtractor = require('../middleware/userExtractor')
const { admin } = require('../middleware/rolsExtractor')
// const multer = require('multer')


// const upload = multer({
//   limits: {
//     fileSize: "50MB"
//   } 
// })
// traigo los handlers

const { loginHandler,registerHandler, updateHandler, getUsers, authenticationFromGoogle,deleteUser, restoreUser, unLockUser, getUser } = require('../controllers/handlersUser/authHandler');

// rutas

authRouter.get('/users',admin, getUsers);
authRouter.get('/user/:id',userExtractor, getUser);
authRouter.post('/login', loginHandler)
authRouter.post('/register', registerHandler)
authRouter.post('/fromGoogle', authenticationFromGoogle)

authRouter.put('/userUpdate/:id', userExtractor, updateHandler)
authRouter.delete('/user/:id', userExtractor, deleteUser)
authRouter.delete('/unLockUser/:id', userExtractor, unLockUser)
authRouter.post('/user/restore/:id',userExtractor, restoreUser)

module.exports = authRouter