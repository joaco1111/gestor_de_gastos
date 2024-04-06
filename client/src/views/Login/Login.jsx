import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { login, authenticationFromGoogle } from '../../redux/actions';
import { validate } from '../../utils';
import "./login.css"
import { Container, Form, Button,Row,Col} from 'react-bootstrap';
import { FaLock, FaUser, FaArrowLeft } from 'react-icons/fa';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAqsU0vjIZ1BfA_oeiLOpaGHZONUt02uMk",
    authDomain: "gestor-de-pago.firebaseapp.com",
    projectId: "gestor-de-pago",
    storageBucket: "gestor-de-pago.appspot.com",
    messagingSenderId: "357483683234",
    appId: "1:357483683234:web:d5ce922a345680f14326fb",
    measurementId: "G-D15CHFV0VP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


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

    const handleSubmit = async(event) => {
        event.preventDefault();
        const credentials = {
            email: userData.email,
            password: userData.password
        };

        await dispatch(login(credentials));
        window.location.reload();
    };

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                const { email, displayName, uid } = user; 

                const credentials = {
                    email,
                    displayName,
                    uid
                }
                dispatch(authenticationFromGoogle(credentials))
                setLoggedIn(true);
            }).catch((error) => {
                console.error(error);
            });
    };

    return(
        <div fluid className="container-form">
            <div className="container-second">
            <Row>
                <Col>
                    
                    <Form className="login-form" onSubmit={handleSubmit}>
                        <Link to="/" className="go-back-button">
                            <FaArrowLeft />  
                        </Link>
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
                        <Button variant='danger' className="submit-button google" onClick={handleGoogleSignIn}>Sign in with Google</Button>
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
            </div>
        </div>
    )
};

export default Login;
