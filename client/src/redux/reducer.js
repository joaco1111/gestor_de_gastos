import { GET_USERS, ADD_EXPENSE_INCOME, GET_CATEGORIES_EXPENSE, GET_CATEGORIES_INCOME } from "./action-types";

const initialState = {
    users: [],
    expenses: [],
    categorieExpense: [],
    categorieIncome: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state, users: action.payload
            }
        case ADD_EXPENSE_INCOME:
            return {
                ...state,
                expenses: [...state.expenses, action.payload]
            }

        case GET_CATEGORIES_EXPENSE: 
            return {
                ...state,
                categorieExpense: action.payload
            };

        case GET_CATEGORIES_INCOME: 
            return {
                ...state,
                categorieIncome: action.payload
            };
        
        default:
            return {
                ...state
            };
    }
};

export default rootReducer;