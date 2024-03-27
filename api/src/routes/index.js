const { Router } = require('express');
const {createActions,
        getActions,
        getActionById,
        updateAction,
    deleteAction} = require('../controllers/Actions/actionsControllers')
const {createReview, getReview, updateReview, deleteReview} = require('../controllers/Review/review');
//traigo mis rutas
const authRouter = require('./authRoute');
const userExtractor = require('../middleware/userExtractor')
const { filters } = require('../controllers/Filtres/Filters');
const { getCategoryBills, getCategoryIncomes } = require('../controllers/Categories/Category');
const {getCollaborations} = require('../controllers/Collaborations/Collaborations')
const {createOrder, receiveWebHook} = require('../mercadoPago/payment.controllers');
const { metricasActions } = require('../controllers/metricas/metricasActions');
const router = Router();

//CATEGORIAS BILLS
router.get('/categoryBills', getCategoryBills);
//CATEGORIAS INCOME
router.get('/categoryIncome', getCategoryIncomes);

//ACTIONS
//Ruta crear una Actions
router.post('/actions', userExtractor, createActions)
//Ruta obtener los datos de la Actions
router.get('/actions', userExtractor, getActions)
//Ruta actualizar los datos de la Actions
router.put('/actions/:id', userExtractor, updateAction)
//Ruta obtener los datos de la Action por id
router.get('/action/:id', userExtractor, getActionById)
//Ruta eliminar algun dato de la Actions
router.delete('/action/:id', userExtractor, deleteAction)
//Ruta metricas de actions 
router.get('/actions/metricas', userExtractor, metricasActions);

//RESEÑA||REVIEW
//Ruta para obtener las reseñas
router.get('/review', getReview)
//Ruta para crear una reseña
// router.post('/review', createReview);
//Ruta para actualizar la reseña
router.put('/review/:id', updateReview);
//Ruta para eliminar una reseña
router.delete('/review/:id', deleteReview);

//ruta para crear las colaboraciones(donacion)

router.get('/collaboration', userExtractor, getCollaborations)

//mercadoPago

router.post('/create-order',userExtractor, createOrder)
router.get('/success')
router.get('/failure')
router.get('/pending')
router.post('/webhook', receiveWebHook)
//USERS
/*ruta para 
1. logiar
2. registrar
3. leer users
4. actualizar
5. eliminar
*/

router.use('/auth', authRouter)

//FILTROS 
router.get('/filters', userExtractor, filters)


module.exports = router

// ejemplo de las rutas:
// http://localhost:3001/auth/login     ===> para el login
// http://localhost:3001/auth/register  ===> para el register

//http://localhost:3001/userUpdate/idUser?datos_query   ====> para el update

