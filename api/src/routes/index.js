const { Router } = require('express');
const { users } = require('../../users.json');

const router = Router();

router.get('/users', (req, res) => {
    return res.send(users)
})

//traigo mis rutas

const authRouter = require('./authRoute')

//hago el enrutado

router.use('/auth', authRouter)


module.exports = router

// ejemplo de las rutas:
// http://localhost:3001/auth/login     ===> para el login
// http://localhost:3001/auth/register  ===> para el register