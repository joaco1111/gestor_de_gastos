import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions';
import { validate } from '../../utils';
import './Login.css';
import { Container, Form, Button } from 'react-bootstrap';

const Login = () => {
    const dispatch = useDispatch();
    const loginError = useSelector(state => state.loginError);

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
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

    return (
        <Container fluid className={`d-flex justify-content-center align-items-center ${style['login-container']}`}>
            <div className="w-50">
                <h1 className="text-center">Login</h1>
                {loginError && <p className="text-danger">{loginError}</p>}
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
