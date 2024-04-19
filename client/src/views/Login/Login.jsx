import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { login, authenticationFromGoogle } from '../../redux/actions';
import { validate } from '../../utils';
import './Login.css';
import { Container, Form, Button,Row,Col} from 'react-bootstrap';
import { FaLock, FaUser, FaArrowLeft } from 'react-icons/fa';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";


// datos desde variable de entorno.
const { 
    VITE_API_KEY: apiKey,
    VITE_AUTH_DOMAIN: authDomain,
    VITE_PROJECT_ID: projectId,
    VITE_STORAGE_BUCKET: storageBucket,
    VITE_MESSAGING_SENDER_ID: messagingSenderId,
    VITE_APP_ID: appId,
    VITE_MEASUREMENT_ID: measurementId
} = import.meta.env;

const fireBaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
}

// Initialize Firebase
const app = initializeApp(fireBaseConfig);
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

        dispatch(login(credentials, "login"));
        // window.location.reload();
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
                        <div>
                            <Button variant="primary" type="submit" className="submit-button">Login</Button>
                            <Button variant='danger' id="google-button" className="submit-button google" onClick={handleGoogleSignIn}>Sign in with Google</Button>
                        </div>

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
