const { Router } = require('express');
const update = require('../controllers/update_user/Update');
const {createActions,
        getActions,
        updateAction,
    deleteAction} = require('../controllers/Actions/actionsControllers')
const {create_review, get_review, update_review, delete_review} = require('../controllers/Review/review');
const userExtractor = require('../middleware/userExtractor')

//traigo mis rutas
const authRouter = require('./authRoute');
const { filters } = require('../controllers/Filtres/Filters');

const router = Router();


//USER
//Ruta actualziar datos del usuario
router.put('/user/:id', update)


//ACTIONS
//Ruta crear una Actions
router.post('/actions', createActions)
//Ruta obtener los datos de la Actions
router.get('/actions', getActions)
//Ruta actualizar los datos de la Actions
router.put('/actions/:id', updateAction)
//Ruta eliminar algun dato de la Actions
router.delete('/action/:id', deleteAction)

//RESEÑA||REVIEW
//Ruta para obtener las reseñas
router.get('/review', userExtractor, get_review) // ruta de como funcionaria jwt
//Ruta para crear una reseña
router.post('/review', create_review);
//Ruta para actualizar la reseña
router.put('/review/:id', update_review);
//Ruta para eliminar una reseña
router.delete('/review/:id', delete_review);

// ruta para logiar/registrar
router.use('/auth', authRouter)

//FILTROS 
router.get('/filters', filters)


module.exports = router

// ejemplo de las rutas:
// http://localhost:3001/auth/login     ===> para el login
// http://localhost:3001/auth/register  ===> para el register

//http://localhost:3001/user/id_usuario?datos_query   ====> para el update

