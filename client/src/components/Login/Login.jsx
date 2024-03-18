import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
//import { login } from '../../redux/actions';
import { validate } from '../../utils';
import { useNavigate } from 'react-router-dom';
import style from './Login.module.css';
//import axios from 'axios';

//const baseURL = 'http://localhost:3001/auth';

const Login = ({ loggin, token }) => {
    //const dispatch = useDispatch();
    //const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        console.log(token);
    }, []);

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    //const token = useSelector(state => state.token);
    console.log(token);

    //const [token, setToken] = useState(null);

    const handleChange = (event) => {                                          //Con esta fn logro que el input sea un reflejo del estado
        const property = event.target.name;                                     
        const value = event.target.value;
        validate({ ...userData, [property]: value }, setErrors, errors);       //Quiero validar los datos ingresados al form, cada vez que ocurra un cambio en los inputs(Por esto llamo la fn validate dentro de handleOnChange). A validate NO le paso como parámetro el estado inicial(form) sino el estado modificado{ ...form, [property]: value }, esto se hace para evitar un "delete" en los valores registrados de los inputs 
        setUserData({ ...userData, [property]: value });
    };

    const handleSubmit = async(event) => {
        event.preventDefault();                                                //Para evitar que al hacer click en Loggin se recargue la página y se me borren los datos ingresados                                                           //Como la fn es asyn hay que poner try - catch
        //try {
            const credentials = {
                email: userData.email,
                password: userData.password
            };
            await loggin(credentials);
            // if(typeof objToken !== 'string') {
            //     navigate('/home');
            // } else {
            //     navigate('/');
            // }
        // } catch (error) {
        //     setErrors({ ...errors, email: 'Wrong credentials', password: 'Wrong credentials'});
        // }
  
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