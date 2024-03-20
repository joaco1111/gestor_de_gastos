import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions';
import { validate } from '../../utils';
import style from './Login.module.css';
import { Container, Form, Button } from 'react-bootstrap';

const Login = () => {
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {                                          //Con esta fn logro que el input sea un reflejo del estado
        const property = event.target.name;                                     
        const value = event.target.value;
        validate({ ...userData, [property]: value }, setErrors, errors);       //Quiero validar los datos ingresados al form, cada vez que ocurra un cambio en los inputs(Por esto llamo la fn validate dentro de handleOnChange). A validate NO le paso como parámetro el estado inicial(form) sino el estado modificado{ ...form, [property]: value }, esto se hace para evitar un "delete" en los valores registrados de los inputs 
        setUserData({ ...userData, [property]: value });
    };

    const handleSubmit = async(event) => {
        event.preventDefault();                                                //Para evitar que al hacer click en Loggin se recargue la página y se me borren los datos ingresados                                                           //Como la fn es asyn hay que poner try - catch

        const credentials = {
            email: userData.email,
            password: userData.password
        };
        console.log(credentials);
        await dispatch(login(credentials));
    };

    return(
        <Container fluid className={`d-flex justify-content-center align-items-center ${style['login-container']}`}>
            <div className="w-50">
                <h1 className="text-center">Login</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={userData.email} onChange={handleChange} name="email" />
                        {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={userData.password} onChange={handleChange} name="password" />
                        {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>

                <div className="mt-3 text-center">
                    <Link to="/forgot-password" className="mr-2">Forgot password?</Link>
                    <Link to="/log">Log</Link>
                </div>
            </div>
        </Container>
    )
};

export default Login;