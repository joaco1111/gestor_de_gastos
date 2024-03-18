import { SAVE_TOKEN } from './action-types';
import axios from 'axios';

const baseURL = 'http://localhost:3001/auth';

export const login = (credentials) => {                                         
    return async function(dispatch) {                                           
        const objToken = (await axios.post(`${baseURL}/login`, credentials)).data;        //Aquí(.data) estaría la info que nos interesa para la sesión del usuario
        console.log(objToken);
        const token = `Bearer ${objToken.tokenUser}`;
        dispatch({ type: SAVE_TOKEN, payload: token });
    }
};