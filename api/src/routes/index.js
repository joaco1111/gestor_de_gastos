const { Router } = require('express');
const {createActions,
        getActions,
        updateAction,
    deleteAction} = require('../controllers/Actions/actionsControllers')
const {createReview, getReview, updateReview, deleteReview} = require('../controllers/Review/review');

//traigo mis rutas
const authRouter = require('./authRoute');
const userExtractor = require('../middleware/userExtractor')
const { filters } = require('../controllers/Filtres/Filters');
const { getCategoryBills, getCategoryIncomes } = require('../controllers/Categories/Category');

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
//Ruta eliminar algun dato de la Actions
router.delete('/action/:id', userExtractor, deleteAction)

//RESEÑA||REVIEW
//Ruta para obtener las reseñas
router.get('/review', getReview)
//Ruta para crear una reseña
// router.post('/review', createReview);
//Ruta para actualizar la reseña
router.put('/review/:id', updateReview);
//Ruta para eliminar una reseña
router.delete('/review/:id', deleteReview);

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

