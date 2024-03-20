const { Router } = require('express');
const authRouter = Router()
const userExtractor = require('../middleware/userExtractor')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req,file, cb) {
        const uploadDir = path.join(__dirname, '../../uploads');
        cb(null, uploadDir);
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
})

const upload = multer({storage: storage})
// traigo los handlers


const { loginHandler,registerHandler, updateHandler, getUsers, authenticationFromGoogle,deleteUser, restoreUser } = require('../controllers/handlersUser/authHandler')

// rutas

authRouter.get('/users', getUsers)
authRouter.post('/login', loginHandler)
authRouter.post('/register', registerHandler)
authRouter.post('/fromGoogle', authenticationFromGoogle)
authRouter.post('/userUpdate', userExtractor, upload.single('image'), updateHandler)
authRouter.delete('/user/:id', deleteUser)
authRouter.put('user/:id/restore', restoreUser)
module.exports = authRouter