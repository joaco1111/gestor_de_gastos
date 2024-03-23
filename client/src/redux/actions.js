import { GET_USERS, LOGIN , ADD_EXPENSE_INCOME, GET_CATEGORIES_EXPENSE, GET_CATEGORIES_INCOME, GET_ACTIONS, DELETE_ACTION, UPDATE_ACTION,UPDATE_ACTION_ERROR, GET_ACTION_DETAIL, CLEAN_USER, LOGIN_FAILED } from './action-types';
import axios from 'axios';

const baseURL = 'http://localhost:3001/auth';

export const login = (credentials) => {                                         
    return async function(dispatch) {      
        try {
            const user = (await axios.post(`${baseURL}/login`, credentials)).data;
            // console.log(user);
            dispatch({ type: LOGIN, payload: user });
        } catch (error) {
            console.error('Error en la solicitud de inicio de sesión:', error);
            // Envío el error al estado para manejarlo en el componente Login
            dispatch({ type: LOGIN_FAILED, payload: error.response.data });
        }                                     
    }
};

export const getUsers = () => {
    return async function(dispatch) {
        const users = (await axios.get('http://localhost:3001/auth/users')).data;
        dispatch({ type: GET_USERS, payload: users});
    }
};

export const addExpenseIncome = (payload) => {
    return async (dispatch) => {
        try {
            //creamos la constante localToken para almacenar el token que esta en el localStorage
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
            if(loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON);
                const localToken = user.tokenUser;
                console.log(localToken, "Llega")
                //config tiene la propiedad de headers donde va a estar pasando el token para dar el permiso en el backEnd
                const config = {
                    headers: {
                        token: localToken,
                    }
                }
                const apiData = await axios.post("http://localhost:3001/actions", payload, config)
                const expense = apiData.data

                return dispatch({
                    type: ADD_EXPENSE_INCOME,
                    payload: expense,
                });
            }
        } catch (error) {
            alert("Ocurre un error")
            throw error;
        }
    }
};

export const getCategoryExpense = () => {
    return async function(dispatch) {
        try {
            const categories = (await axios.get('http://localhost:3001/categoryBills')).data;
            dispatch({
                 type: GET_CATEGORIES_EXPENSE,
                  payload: categories 
                });
        } catch (error) {
            alert("Ocurrió un error al obtener las categorías");
            throw error;
        }
    }
};

export const getCategoryIncome = () => {
    return async function(dispatch) {
        try {
            const categories = (await axios.get('http://localhost:3001/categoryIncome')).data;
            dispatch({
                 type: GET_CATEGORIES_INCOME,
                  payload: categories 
                });
        } catch (error) {
            alert("Ocurrió un error al obtener las categorías");
            throw error;
        }
    }
};


export const fetchActions = (page = 1, limit = 10, data, type, category) => {
    return async function(dispatch) {
        try {
            const localToken = await JSON.parse(localStorage.getItem('token'));

            const config = {
                headers: {
                    token: localToken,
                },
                params: { page, limit, data, type, category }
            };

            const response = await axios.get(`http://localhost:3001/actions`, config);
            console.log(response.data);

            const { rows, count } = response.data;

            dispatch({
                type: GET_ACTIONS,
                payload: { actions: rows, totalCount: count }
            });
        } catch (error) {
            console.error('Error al obtener las acciones:', error);
        }
    };
};


export const deleteAction = (id) => {
    return async (dispatch) => {
        try {
            const localToken = await JSON.parse(localStorage.getItem('token'));

            const config = {
                headers: {
                    token: localToken,
                }
            };

            await axios.delete(`http://localhost:3001/action/${id}`, config);

            dispatch({
                type: DELETE_ACTION,
                payload: id
            });
        } catch (error) {
            console.error('Error al eliminar la acción:', error);
        }
    };
};

export const authenticationFromGoogle = (credentials) => {
    return async (dispatch) => {
        try{
            const user = (await axios.post(`${baseURL}/fromGoogle`,credentials)).data
            console.log(user);
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
        const localToken = JSON.parse(localStorage.getItem('token'));
        
        const config = {
          headers: {
            token: localToken
          }
        };
  
        const response = await axios.get(`http://localhost:3001/action/${id}`, config);
  
        dispatch({
          type: GET_ACTION_DETAIL,
          payload: response.data
        });
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
        const localToken = JSON.parse(localStorage.getItem('token'));
        
        const config = {
          headers: {
            token: localToken
          }
        };
  
        const response = await axios.put(`http://localhost:3001/actions/${id}`, data, config);
  
        dispatch({
          type: UPDATE_ACTION,
          payload: response.data
        });
      } catch (error) {
        console.error('Error al actualizar la acción:', error);
        dispatch({
          type: UPDATE_ACTION_ERROR,
          payload: error.message
        });
      }
    };
  };
  

export const cleanUser = (emptyUser) => {
    return { type: CLEAN_USER, payload: emptyUser }
};