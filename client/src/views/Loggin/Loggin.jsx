import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { login, getUsers } from '../../redux/actions';
import { validate } from '../../utils';
import style from './Loggin.module.css';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();

const Login = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const users = useSelector(state => state.users);

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        validate({ ...userData, [property]: value }, setErrors, errors);
        setUserData({ ...userData, [property]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const credentials = {
            email: userData.email,
            password: userData.password
        };
        await dispatch(login(credentials));
    };

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                // Aquí puedes realizar acciones adicionales después del inicio de sesión con Google, como guardar el usuario en el estado o redirigir a otra página.
            }).catch((error) => {
                console.error(error);
            });
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
            <button type='button' onClick={handleGoogleSignIn}>Login with Google</button>
            <div>
                <Link to='/forgot-password'>Forgot password?</Link>
                <br />
                <Link to='/log'>Log</Link>
            </div>
        </form>
    )
};

export default Login;
