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

const { loginHandler,registerHandler, updateHandler, getUsers } = require('../controllers/handlersUser/authHandler')

// rutas

authRouter.post('/login', loginHandler)
authRouter.post('/register', registerHandler)
authRouter.post('/userUpdate', userExtractor, upload.single('image'), updateHandler)

module.exports = authRouter