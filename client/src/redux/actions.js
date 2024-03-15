import { GET_USERS } from './action-types';
import axios from 'axios';

export const getUsers = () => {
    return async function(dispatch) {
        const users = (await axios.get('https://jsonplaceholder.typicode.com/users')).data;
        dispatch({ type: GET_USERS, payload: users});
    }
};