import { LOGIN, DELETE_ACTION, GET_USERS, ADD_EXPENSE_INCOME, GET_CATEGORIES_EXPENSE, GET_CATEGORIES_INCOME, GET_ACTIONS, CLEAN_USER, LOGIN_FAILED, LOG_FAILED } from './action-types';

const initialState = {
    users: [],
    user: {},
    newUser: {},
    expenses: [],
    categorieExpense: [],
    categorieIncome: [],
    actions: [],
    loginError: '',
    logError: '',
    totalCount: ''
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload,
                loginError: ''
            };
        case GET_USERS:
            return {
                ...state,
                users: action.payload.rows
            };
        case ADD_EXPENSE_INCOME:
            return {
                ...state,
                expenses: [...state.expenses, action.payload]
            };
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
        case GET_ACTIONS:
            return {
                ...state,
                actions: action.payload.actions,
                totalCount: action.payload.totalCount
            };
        case CLEAN_USER:
            return {
                ...state,
                user: action.payload
            };
        case LOGIN_FAILED:
            return {
                ...state,
                loginError: action.payload
            };
        case DELETE_ACTION:
            // Filtra las acciones para eliminar la acción con el ID correspondiente
            const updatedActions = state.actions.filter(action => action.id !== action.payload);
            return {
                ...state,
                actions: updatedActions
            };
        case LOG_FAILED:
            return {
                ...state, logError: action.payload
            }
        default:
            return state;
    }
};

export default rootReducer;
