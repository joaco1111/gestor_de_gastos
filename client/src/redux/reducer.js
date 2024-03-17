import { GET_USERS, LOGIN, TOKEN } from './action-types';

const initialState = {
    users: [],
    login: {},
    token: '',
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state, login: action.payload
            }
        case GET_USERS:
            return {
                ...state, users: action.payload
            }
        case TOKEN: 
            return {
                ...state, token: action.payload
            }
        default:
            return {
                ...state
            };
    }
};

export default rootReducer;