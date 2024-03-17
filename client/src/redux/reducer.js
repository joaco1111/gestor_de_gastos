import { GET_USERS, ADD_EXPENSE, GET_CATEGORIES } from "./action-types";

const initialState = {
    users: [],
    expenses: [],
    categories: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state, users: action.payload
            }
        case ADD_EXPENSE:
            return {
                ...state,
                expenses: [...state.expenses, action.payload]
            }

        case GET_CATEGORIES: 
            return {
                ...state,
                categories: action.payload
            };
        
        default:
            return {
                ...state
            };
    }
};

export default rootReducer;