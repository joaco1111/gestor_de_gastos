import { GET_USERS, LOGIN, TOKEN } from './action-types';
import axios from 'axios';

const baseURL = 'http://localhost:3001/auth';
//let token = null;

export const getUsers = () => {
    return async function(dispatch) {
        const users = (await axios.get(baseURL)).data;
        dispatch({ type: GET_USERS, payload: users});
    }
};

export const login = (credentials) => {                                         
    return async function(dispatch) {                                           
        const response = (await axios.post(`${baseURL}/login`, credentials)).data;        //Aquí(.data) estaría la info que nos interesa para la sesión del usuario
        dispatch({ type: LOGIN, payload: response});
    }
};

export const setToken = (newToken) => {
    return { type: TOKEN, payload: `Bearer ${newToken}` };
};