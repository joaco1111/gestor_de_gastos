const { Router } = require('express');
const update = require('../controllers/update_user/Update');


const router = Router();

//Ruta actualziar datos del usuario
router.put('/user/:id', update)



//traigo mis rutas

const authRouter = require('./authRoute')

//hago el enrutado

router.use('/auth', authRouter)


module.exports = router

// ejemplo de las rutas:
// http://localhost:3001/auth/login     ===> para el login
// http://localhost:3001/auth/register  ===> para el register
