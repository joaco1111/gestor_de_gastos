<<<<<<< HEAD
import { GET_USERS, LOGIN , ADD_EXPENSE_INCOME, GET_CATEGORIES_EXPENSE, GET_CATEGORIES_INCOME, GET_ACTIONS, DELETE_ACTION, CLEAN_USER, LOGIN_FAILED } from './action-types';
=======
import { GET_USERS, LOGIN, LOG, ADD_EXPENSE_INCOME, GET_CATEGORIES_EXPENSE, GET_CATEGORIES_INCOME, GET_ACTIONS, DELETE_ACTION, UPDATE_ACTION, UPDATE_ACTION_ERROR, GET_ACTION_DETAIL, CLEAN_USER, LOGIN_FAILED, LOG_FAILED } from './action-types';
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
import axios from 'axios';

const baseURL = 'http://localhost:3001/auth';

export const login = (credentials) => {                                         
    return async function(dispatch) {      
        try {
            const user = (await axios.post(`${baseURL}/login`, credentials)).data;
<<<<<<< HEAD
            console.log(user);
            dispatch({ type: LOGIN, payload: user });
        } catch (error) {
            console.error('Error en la solicitud de inicio de sesión:', error);
=======
            // console.log(user);
            dispatch({ type: LOGIN, payload: user });
        } catch (error) {
            //console.error('Error en la solicitud de inicio de sesión:', error);
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
            // Envío el error al estado para manejarlo en el componente Login
            dispatch({ type: LOGIN_FAILED, payload: error.response.data });
        }                                     
    }
};

<<<<<<< HEAD
=======
export const log = (newUser) => {
    return async function(dispatch) {      
        try {
            const response = (await axios.post(`${baseURL}/register`, newUser)).data;
            console.log(response);
            console.log(typeof response);
            if(typeof response !== 'string') {
                return dispatch({ type: LOG, payload: response });
            }
            dispatch({ type: LOG_FAILED, payload: response });
        } catch (error) {
            console.error('Error al registrar en la DB:', error);
        }                                     
    }
};

>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
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
<<<<<<< HEAD
                const expense = apiData.data
    
                alert("Exito")

=======
                console.log(apiData.data);
                const expense = apiData.data
    
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
                return dispatch({
                    type: ADD_EXPENSE_INCOME,
                    payload: expense,
                });
            }
        } catch (error) {
<<<<<<< HEAD
            alert("Ocurre un error")
=======
 
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
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
<<<<<<< HEAD
            alert("Ocurrió un error al obtener las categorías");
=======
           
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
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
<<<<<<< HEAD
            alert("Ocurrió un error al obtener las categorías");
=======
            
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
            throw error;
        }
    }
};


<<<<<<< HEAD
export const fetchActions = (page = 1, limit = 10) => {
    return async function(dispatch) {
        try {
            // Obtén el token del almacenamiento local
            const localToken = await JSON.parse(localStorage.getItem('token'));

            // Configura los headers de la solicitud
            const config = {
                headers: {
                    token: localToken,
                },
                params: { page, limit }
            };

            // Realiza la solicitud
            const response = await axios.get(`http://localhost:3001/actions`, config);
            console.log(response.data);

            const { rows, count } = response.data; // Accede a los datos de la respuesta

            dispatch({
                type: GET_ACTIONS,
                payload: { actions: rows, totalCount: count } // Envía tanto las acciones como el recuento total de registros
            });
        } catch (error) {
            console.error('Error al obtener las acciones:', error);
            // Aquí podrías manejar el error de acuerdo a tus necesidades
=======
export const fetchActions = (page = 1, limit = 10, data, type, category) => {
    return async function(dispatch) {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
            if(loggedUserJSON) {
                // Obtén el token del almacenamiento local
                const user = JSON.parse(loggedUserJSON);
                const localToken = user.tokenUser;
                
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
            }
        } catch (error) {
            console.error('Error al obtener las acciones:', error);
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
        }
    };
};

<<<<<<< HEAD
export const deleteAction = (id) => {
    return async (dispatch) => {
        try {
            // Realiza la solicitud DELETE al servidor
            await axios.delete(`http://localhost:3001/action/${id}`);

            // Si la eliminación es exitosa, actualiza el estado de Redux para reflejar los cambios
            dispatch({
                type: DELETE_ACTION,
                payload: id // Envía el ID de la acción eliminada al reducer
            });

            // Opcionalmente, puedes realizar otras acciones después de la eliminación, como mostrar un mensaje de éxito, etc.
        } catch (error) {
            console.error('Error al eliminar la acción:', error);
            // Aquí podrías manejar el error de acuerdo a tus necesidades
=======

export const deleteAction = (id) => {
    return async (dispatch) => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
            console.log(loggedUserJSON);
            if(loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON);
                const localToken = user.tokenUser;
                console.log(localToken);
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
            }
        } catch (error) {
            console.error('Error al eliminar la acción:', error);
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
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

<<<<<<< HEAD
=======
export const fetchActionDetail = (id) => {
    return async function(dispatch) {
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            const localToken = user.tokenUser;
            console.log(localToken);
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
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            const localToken = user.tokenUser;
        
            const config = {
            headers: {
                token: localToken
            }
            };
  
        const response = await axios.put(`http://localhost:3001/actions/${id}`, data, config);
        console.log(response.data)
  
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
  
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
export const cleanUser = (emptyUser) => {
    return { type: CLEAN_USER, payload: emptyUser }
};