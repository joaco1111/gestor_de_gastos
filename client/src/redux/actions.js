import { LOGIN } from './action-types';
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