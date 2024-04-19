import { GET_USERS, LOGIN,  ADD_EXPENSE_INCOME, GET_CATEGORIES_EXPENSE, GET_CATEGORIES_INCOME, GET_ACTIONS, SET_METRICS, DELETE_ACTION, UPDATE_ACTION, UPDATE_ACTION_ERROR, GET_ACTION_DETAIL, CLEAN_USER, GET_TRANSACTIONS, LOGIN_FAILED, LOG_FAILED, INCREMENT_NUMBER_PUNTUACION, CLEAN_ACTIONS } from './action-types';

import axios from 'axios';


//token del local Storage
const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
//config general, si necesitas otra configuración como params, agregala dentro de tu función

var config = {}
if(loggedUserJSON){
    const token = JSON.parse(loggedUserJSON);
    config["headers"] = {
            token: token.tokenUser,
        }
}

export const incrementNumberPuntuacion = (value)=> {
    return (dispatch)=> {
        dispatch({type: INCREMENT_NUMBER_PUNTUACION, payload: value})
    }
}


export const login = (credentials, type) => {                                         
    return async function(dispatch) {      
        try {
            if(type === "login"){
                const user = (await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, credentials)).data;
                
                console.log(user);
                dispatch({ type: LOGIN, payload: user });
                //dispatch({ type: CLEAN_ACTIONS, payload: { actions: [], totalCount: 0 } });
            }else {
                const response = (await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`, credentials)).data;
            
                if(typeof response !== 'string') {
                    return dispatch({ type: LOGIN, payload: response });
                }

                dispatch({ type: LOG_FAILED, payload: response });
            }
        } catch (error) {
            //console.error('Error en la solicitud de inicio de sesión:', error);
            // Envío el error al estado para manejarlo en el componente Login
            dispatch({ type: LOGIN_FAILED, payload: error.response.data });
        }                                     
    }
};

export const log = (newUser) => {
    return async function(dispatch) {      
        try {
            const response = (await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`, newUser)).data;
            
            if(typeof response !== 'string') {
                return dispatch({ type: LOG, payload: response });
            }
            dispatch({ type: LOG_FAILED, payload: response });
        } catch (error) {
            console.error('Error al registrar en la DB:', error);
        }                                     
    }
};

export const getUsers = (value) => {
    return async function(dispatch) {

        if(loggedUserJSON){
            const users = (await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/users?search=${value}`, config)).data;
            dispatch({ type: GET_USERS, payload: users});
        }
    }
};

export const addExpenseIncome = (payload) => {
    return async (dispatch) => {
        try {
            if(loggedUserJSON) {   

                const apiData = await axios.post(`${import.meta.env.VITE_BASE_URL}/actions`, payload, config);

                const expense = apiData.data

                console.log('Respuesta del servidor al agregar gasto o ingreso:', expense); 
    
                return dispatch({
                    type: ADD_EXPENSE_INCOME,
                    payload: expense,
                });
            }
        } catch (error) {
 
            throw error;
        }
    }
};

export const getCategoryExpense = () => {
    
    return async function(dispatch) {
        try {
            const categories = (await axios.get(`${import.meta.env.VITE_BASE_URL}/categoryBills`)).data;
            dispatch({
                 type: GET_CATEGORIES_EXPENSE,
                  payload: categories 
                });
        } catch (error) {
           
            throw error;
        }
    }
};

export const getCategoryIncome = () => {
    return async function(dispatch) {
        try {
            const categories = (await axios.get(`${import.meta.env.VITE_BASE_URL}/categoryIncome`)).data;

            dispatch({
                 type: GET_CATEGORIES_INCOME,
                  payload: categories 
                });
        } catch (error) {
            
            throw error;
        }
    }
};


export const fetchActions = (page = 1, limit = 5, filters = {}, orderDirection, orderBy) => {
    return async function(dispatch) {
        try {
            if(loggedUserJSON) {
                const params = { page, limit, ...filters };
                
                if (orderDirection) {
                    params.orderDirection = orderDirection;
                }
                if (orderBy) {
                    params.orderBy = orderBy;
                }

                const configuration = {
                    ...config,
                    params
                };
                
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/actions`, configuration);
                
                // console.log('Respuesta del servidor:', response.data);
                
    
                const { rows, count } = response.data;
    
                dispatch({
                    type: GET_ACTIONS,
                    payload: { actions: rows, totalCount: count }
                });

                return { rows, count };
            }
        } catch (error) {
            console.error('Error al obtener las acciones:', error);
        }
    };
};



export const fetchMetrics = (type, dateInitial, dateLimit) => {
    return async function(dispatch) {
        try {
            if(loggedUserJSON){
                
                const configuration = {
                    ...config,
                    params: { type, dateInitial, dateLimit }
                }

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/actions/metricas`, configuration);

                // console.log('Metricas', response.data);

                if (response.status === 200) {
                    dispatch({ type: SET_METRICS, payload: response.data });
                }
            }
        } catch (error) {
            console.error(error);
            dispatch({ type: 'SET_ERROR', payload: error });
        }
    };
};


export const deleteAction = (id) => {
    return async (dispatch) => {
        try {
            if(loggedUserJSON) {
    
                await axios.delete(`${import.meta.env.VITE_BASE_URL}/action/${id}`, config);
    
                dispatch({
                    type: DELETE_ACTION,
                    payload: id
                });
            }
        } catch (error) {
            console.error('Error al eliminar la acción:', error);
        }
    };
};

export const authenticationFromGoogle = (credentials) => {
    return async (dispatch) => {
        try{
            const user = (await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/fromGoogle`,credentials)).data
            // console.log(user);
            dispatch({ type: LOGIN, payload: user });
        } catch(error){
            console.error('Error en la solicitud de inicio de sesión:', error);
            // Envío el error al estado para manejarlo en el componente Login
            dispatch({ type: LOGIN_FAILED, payload: error.response.data });
        }
    }
}

export const fetchActionDetail = (id) => {
    return async function(dispatch) {
      try {

        if(loggedUserJSON) {
      
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/action/${id}`, config);
      
            dispatch({
              type: GET_ACTION_DETAIL,
              payload: response.data
            });
        }
      } catch (error) {
        console.error('Error al obtener el detalle de la acción:', error);
        dispatch({
          type: FETCH_ACTION_DETAIL_ERROR,
          payload: error.message
        });
      }
    };
  };
  
  export const updateAction = (id, data) => {
    return async function(dispatch) {
      try {

        if(loggedUserJSON) {

            if (data && data.pending === undefined) {
                data.pending = false; // o true, dependiendo de tu lógica
            }
  
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/actions/${id}`, data, config);
        
  
            dispatch({
            type: UPDATE_ACTION,
            payload: response.data
            });
        }
      } catch (error) {
        console.error('Error al actualizar la acción:', error);
        dispatch({
          type: UPDATE_ACTION_ERROR,
          payload: error.message
        });
      }
    };
  };
  
export const cleanUser = () => {
    return { type: CLEAN_USER, payload: {
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
} };
};


export const fetchTransactions = (page = 1, limit = 10, search = "", orderBy, orderDirection) => {
    return async function(dispatch) {
        try {
            if(loggedUserJSON) {
                const params = { page, limit, search };
                if (orderDirection) {
                    params.orderDirection = orderDirection;
                }
                if (orderBy) {
                    params.orderBy = orderBy;
                }

                const configuration = {
                    ...config,
                    params
                };

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/collaboration`, configuration);

            // console.log('Trnsactions', response.data);
      
            dispatch({
              type: GET_TRANSACTIONS,
              payload: response.data
            });
        }
      } catch (error) {
        console.error('Error al obtener las transacciones:', error);
        dispatch({
          type: FETCH_TRANSACTIONS_ERROR,
          payload: error.message
        });
      }
    };
};

