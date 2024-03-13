const { Router } = require('express');
const update = require('../controllers/update_user/Update');


const router = Router();

//Ruta actualziar datos del usuario
router.put('/user/:id', update)




module.exports = router