import { GET_USERS, LOGIN , ADD_EXPENSE_INCOME, GET_CATEGORIES_EXPENSE, GET_CATEGORIES_INCOME, GET_ACTIONS} from './action-types';
import axios from 'axios';

const baseURL = 'http://localhost:3001/auth';

export const login = (credentials) => {                                         
    return async function(dispatch) {                                           
        const user = (await axios.post(`${baseURL}/login`, credentials)).data;        //Aquí(.data) estaría la info que nos interesa para la sesión del usuario
        console.log(user);
        //const token = `Bearer ${user.tokenUser}`;
        dispatch({ type: LOGIN, payload: user });
    }
};

export const getUsers = () => {
    return async function(dispatch) {
        const users = (await axios.get('http://localhost:3001/auth/users')).data;
        dispatch({ type: GET_USERS, payload: users});
    }
};

export const addExpenseIncome = (payload) => {
    return async (dispatch) => {
        try {
            //creamos la constante localToken para almacenar el token que esta en el localStorage
            const localToken = await JSON.parse(localStorage.getItem('token'))
            console.log(localToken, "Llega")
            //config tiene la propiedad de headers donde va a estar pasando el token para dar el permiso en el backEnd
            const config = {
                headers: {
                    token: localToken,
                }
            }
            const apiData = await axios.post("http://localhost:3001/actions", payload, config)
            const expense = apiData.data

            alert("Exito")

            return dispatch({
                type: ADD_EXPENSE_INCOME,
                payload: expense,

            })

        } catch (error) {

            alert("Ocurre un error")
            throw error;
        }
    }
}

export const getCategoryExpense = () => {
    return async function(dispatch) {
        try {
            const categories = (await axios.get('http://localhost:3001/categoryBills')).data;
            dispatch({
                 type: GET_CATEGORIES_EXPENSE,
                  payload: categories 
                });
        } catch (error) {
            alert("Ocurrió un error al obtener las categorías");
            throw error;
        }
    }
};

export const getCategoryIncome = () => {
    return async function(dispatch) {
        try {
            const categories = (await axios.get('http://localhost:3001/categoryIncome')).data;
            dispatch({
                 type: GET_CATEGORIES_INCOME,
                  payload: categories 
                });
        } catch (error) {
            alert("Ocurrió un error al obtener las categorías");
            throw error;
        }
    }
};


export const fetchActions = (page = 1, limit = 10) => {
    return async function(dispatch) {
        try {
            // Obtén el token del almacenamiento local
            const localToken = await JSON.parse(localStorage.getItem('token'))

            // Configura los headers de la solicitud
            const config = {
                headers: {
                    token: localToken,
                },
                params: { page, limit }
            };

            // Realiza la solicitud
            const response = await axios.get(`http://localhost:3001/actions`, config);

            const actions = response.data.rows; // Accede a los datos de la respuesta
            console.log(actions);

            dispatch({
                type: GET_ACTIONS,
                payload: actions
            });
        } catch (error) {
            console.error('Error al obtener las acciones:', error);
            // Aquí podrías manejar el error de acuerdo a tus necesidades
        }
    };
};