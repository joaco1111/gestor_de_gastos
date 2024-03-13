const { Router } = require('express');
const { users } = require('../../users.json');

const router = Router();


module.exports = router

// ejemplo de las rutas:
// http://localhost:3001/auth/login     ===> para el login
// http://localhost:3001/auth/register  ===> para el register