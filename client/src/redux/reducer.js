<<<<<<< HEAD
import { LOGIN, GET_USERS, ADD_EXPENSE_INCOME, GET_CATEGORIES_EXPENSE, GET_CATEGORIES_INCOME, GET_ACTIONS, CLEAN_USER, LOGIN_FAILED, DELETE_ACTION } from './action-types';
=======
import { LOG, LOGIN, DELETE_ACTION, GET_USERS, ADD_EXPENSE_INCOME, GET_CATEGORIES_EXPENSE, GET_CATEGORIES_INCOME, GET_ACTIONS, CLEAN_USER, LOGIN_FAILED, LOG_FAILED, UPDATE_ACTION, UPDATE_ACTION_ERROR, GET_ACTION_DETAIL } from './action-types';
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5

const initialState = {
    users: [],
    user: {},
<<<<<<< HEAD
=======
    newUser: {},
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
    expenses: [],
    categorieExpense: [],
    categorieIncome: [],
    actions: [],
<<<<<<< HEAD
    loginError: ''
=======
    totalCount: 0,
    loginError: '',
    logError: '',
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload,
                loginError: ''
            };
<<<<<<< HEAD
=======
        case LOG: 
            return {
                ...state,
                newUser: action.payload
            }
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
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
<<<<<<< HEAD
            return {
                ...state,
                actions: action.payload.actions,
                totalCount: action.payload.totalCount
=======
            const { actions, totalCount } = action.payload;
            return {
                ...state,
                actions,
                totalCount
            };
        case GET_ACTION_DETAIL:
            return {
                ...state,
                actionDetail: action.payload
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
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
<<<<<<< HEAD
            // Filtra las acciones para eliminar la acción con el ID correspondiente
            const updatedActions = state.actions.filter(action => action.id !== action.payload);
            return {
                ...state,
                actions: updatedActions
            };
=======
            const updatedActions = state.actions.filter(actionItem => actionItem.id !== action.payload);
            return {
                ...state,
                actions: updatedActions,
                totalCount: state.totalCount - 1
            };
        case UPDATE_ACTION:
            return {
                ...state,
                actions: state.actions.map(actionItem => actionItem.id === action.payload.id ? action.payload : actionItem),
                actionDetail: action.payload.id === state.actionDetail.id ? action.payload : state.actionDetail
            };
        case UPDATE_ACTION_ERROR:
            return {
                ...state,
                updateActionError: action.payload
            };
        case LOG_FAILED:
            return {
                ...state, logError: action.payload
            }
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
        default:
            return state;
    }
};

export default rootReducer;
