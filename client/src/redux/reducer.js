import { LOG, LOGIN, DELETE_ACTION, GET_USERS, ADD_EXPENSE_INCOME, GET_CATEGORIES_EXPENSE, GET_CATEGORIES_INCOME, GET_ACTIONS, CLEAN_USER, LOGIN_FAILED, LOG_FAILED, UPDATE_ACTION, SET_METRICS, SET_ERROR, GET_TRANSACTIONS, UPDATE_ACTION_ERROR, GET_ACTION_DETAIL, INCREMENT_NUMBER_PUNTUACION, CLEAN_ACTIONS } from './action-types';

const initialState = {
    users: [],
    user: {},
    newUser: {},
    expenses: [],
    categorieExpense: [],
    categorieIncome: [],
    transactions: [],
    actions: [],
    totalCount: 0,
    loginError: '',
    logError: '',
    numberPuntuacion: 5,
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
                newUser: action.payload,
                logError: ''
            }
        case GET_USERS:
            return {
                ...state,
                users: action.payload.rows
            };
        case ADD_EXPENSE_INCOME:
            console.log("Nuevo gasto o ingreso agregado:", action.payload);
            console.log("Nuevo gasto o ingreso agregado:", action.payload);
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
            // console.log('GET_ACTIONS', action.payload);
            // console.log('GET_ACTIONS', action.payload);
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
        case GET_TRANSACTIONS:
            // console.log('GET_TRANSACTIONS', action.payload);
            return {
                ...state,
                transactions: action.payload
            };
        case CLEAN_USER:
            return action.payload;
        case LOGIN_FAILED:
            return {
                ...state,
                loginError: action.payload
            };
        case DELETE_ACTION:
            const updatedActionsDelete = state.actions.filter(actionItem => actionItem.id !== action.payload);
            return {
                ...state,
                actions: updatedActionsDelete,
                totalCount: state.totalCount - 1
            };
        case UPDATE_ACTION:
            const updatedActionsUpdate = state.actions.map(actionItem => 
                actionItem.id === action.payload.id ? action.payload : actionItem
            );
            return {
                ...state,
                actions: updatedActionsUpdate,
                actionDetail: state.actionDetail && state.actionDetail.id === action.payload.id ? action.payload : state.actionDetail
            };
        case UPDATE_ACTION_ERROR:
            return {
                ...state,
                updateActionError: action.payload
            };
        case SET_METRICS:
            return {
                ...state,
                metrics: action.payload
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case LOG_FAILED:
            return {
                ...state, logError: action.payload
            };
        case INCREMENT_NUMBER_PUNTUACION:
            return {
                ...state, numberPuntuacion: action.payload
            };
        case CLEAN_ACTIONS:
            return {
                ...state,
                actions: action.payload.actions,
                totalCount: action.payload.totalCount
            }
        
        default:
            return state;
    }
};

export default rootReducer;