import { GET_USERS, ADD_EXPENSE, GET_CATEGORIES} from './action-types';
import axios from 'axios';

export const getUsers = () => {
    return async function(dispatch) {
        const users = (await axios.get('https://jsonplaceholder.typicode.com/users')).data;
        dispatch({ type: GET_USERS, payload: users});
    }
};

export const addExpense = (payload) => {
    return async (dispatch) => {
        try {
            const apiData = await axios.post("http://localhost:3001/actions", payload)
            const expense = apiData.data

            alert("Exito")

            return dispatch({
                type: ADD_EXPENSE,
                payload: expense,

            })

        } catch (error) {

            alert("Ocurre un error")
            throw error;
        }
    }
}

export const getCategories = () => {
    return async function(dispatch) {
        try {
            const categories = (await axios.get('http://localhost:3001/categories')).data;
            dispatch({
                 type: GET_CATEGORIES,
                  payload: categories 
                });
        } catch (error) {
            alert("Ocurrió un error al obtener las categorías");
            throw error;
        }
    }
};
