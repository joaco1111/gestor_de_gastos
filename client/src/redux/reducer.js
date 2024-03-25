import { LOGIN, DELETE_ACTION, LOG, GET_USERS, ADD_EXPENSE_INCOME, GET_CATEGORIES_EXPENSE, GET_CATEGORIES_INCOME, GET_ACTIONS, CLEAN_USER, LOGIN_FAILED, LOG_FAILED, UPDATE_ACTION, UPDATE_ACTION_ERROR, GET_ACTION_DETAIL } from './action-types';

const initialState = {
    users: [],
    user: {},
    newUser: {},
    expenses: [],
    categorieExpense: [],
    categorieIncome: [],
    actions: [],
    totalCount: 0,
    loginError: '',
    logError: '',
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload,
                loginError: ''
            };
        case LOG: 
            return {
                ...state,
                newUser: action.payload
            }
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
        default:
            return state;
    }
};

export default rootReducer;
