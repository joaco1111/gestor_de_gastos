<<<<<<< HEAD
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions';
import { validate } from '../../utils';
import './Login.css';
import { Container, Form, Button } from 'react-bootstrap';
=======
import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions';
import { validate } from '../../utils';
import "./login.css"
import { Container, Form, Button,Row,Col} from 'react-bootstrap';
import { FaLock, FaUser } from 'react-icons/fa';

>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5

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

<<<<<<< HEAD
    const handleSubmit = async (event) => {
        event.preventDefault();

=======
    const handleSubmit = async(event) => {
        event.preventDefault();
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
        const credentials = {
            email: userData.email,
            password: userData.password
        };
<<<<<<< HEAD
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
=======
        console.log(credentials);
        await dispatch(login(credentials));
    };

    return(
        <Container fluid className="container-form">
            <Row>
                <Col>
                    <Form className="login-form" onSubmit={handleSubmit}>
                        {/* <h1 className="text-center mb-4">Login</h1> */}
                        {loginError && <p className="error-message">{loginError}</p>}
                        <Form.Group controlId="formBasicEmail">
                            <div className='text-login'>Login</div>
                            <Form.Label className="form-label"><FaUser/> Email:</Form.Label>
                            <Form.Control type="email" value={userData.email} onChange={handleChange} name="email" className="form-control" />
                            {errors.email && <p className="error-message">{errors.email}</p>}
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label className="form-label"><FaLock/> Password:</Form.Label>
                            <Form.Control type="password" value={userData.password} onChange={handleChange} name="password" className="form-control" />
                            {errors.password && <p className="error-message">{errors.password}</p>}
                        </Form.Group>
                        <Button variant="primary" type="submit" className="submit-button">
                            Login
                        </Button>
                        <div className="mt-3 text-center">
                            <Link to="/forgot-password" className="mr-2">Forgot password?</Link>
                        </div>
                        <div className="mt-3 text-center">
                            <span className='mr-2'>Don't have an account?</span>
                            <Link to="/log">Register Now</Link>
                        </div>
                    </Form>
                </Col>
            </Row>
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
        </Container>
    )
};

export default Login;
