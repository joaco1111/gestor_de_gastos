import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers, login } from '../../redux/actions';
import { validate } from '../../utils';
import style from './Login.module.css';

const Login = ({ loggin }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    //Este useEffect me sirve únicamente para leer la localStorage(revisar si está bien)
    useEffect(() => {                                                         
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(login(user));
        }
    }, []);

    const users = useSelector(state => state.users);

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        user: null
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        user: ''
    });

    const handleChange = (event) => {                                          //Con esta fn logro que el input sea un reflejo del estado
        const property = event.target.name;                                     
        const value = event.target.value;
        validate({ ...userData, [property]: value }, setErrors, errors);       //Quiero validar los datos ingresados al form, cada vez que ocurra un cambio en los inputs(Por esto llamo la fn validate dentro de handleOnChange). A validate NO le paso como parámetro el estado inicial(form) sino el estado modificado{ ...form, [property]: value }, esto se hace para evitar un "delete" en los valores registrados de los inputs 
        setUserData({ ...userData, [property]: value });
    };

    const handleSubmit = async(event) => {
        event.preventDefault();                                                //Para evitar que al hacer click en Loggin se recargue la página y se me borren los datos ingresados
        try {                                                                  //Como la fn es asyn hay que poner try - catch
            const credentials = {
                email: userData.email,
                password: userData.password
            };
            const user = await loggin(credentials/*userData, users*/);         //En este user me llega el token desde el back, como la demás info del user

            //Para guardar el TOKEN en la localStorage
            window.localStorage.setItem(
                'loggedNoteAppUser', JSON.stringify(user)
            );
        } catch (error) {
            setErrors((errors) => ({ ...errors, password: 'Wrong credentials', email: 'Wrong credentials' }));
        }
    };

    return(
        <form onSubmit={handleSubmit} className={style['login-container']}>
            <h1>Login</h1>
            <div>
                <label>Email: </label>
                <input type='email' value={userData.email} onChange={handleChange} name='email'></input>
                {errors.email && <span>{errors.email}</span>}
            </div>
            <div>
                <label>Password: </label>
                <input type='password' value={userData.password} onChange={handleChange} name='password'></input>
                {errors.password && <span>{errors.password}</span>}
            </div>
            <button type='submit'>Login</button>
            <div>
                <Link>¿Forgot password?</Link>
                <br />
                <Link to='/log'>Log</Link>
            </div>
        </form>
    )
};

export default Login;