import { useState } from 'react';
import { validate } from '../../utils';
//import axios from 'axios';
import  './Log.css';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Navigate } from 'react-router-dom';
import { authenticationFromGoogle, login } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';

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

// firebase.auth().onAuthStateChanged(function(user) {
// if (user) {
//    var displayName = user.displayName;
//     var email =  user.email;
//     var emailVarified = user.emailVarified;
//     var photoURL = user.photoURL;
//     var isAnonymous = user.isAnonymous;
//     var uid = user.uid;
//     var providerData  = user.providerData;
//     document.getElementById('log').innerHTML="Esta cuanta ya esta logueada..."
// }else{

// }
// });

const Log = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const logError = useSelector(state => state.logError);
    //console.log(logError);
    const dispatch = useDispatch();

    const[form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        validate({ ...form, [property]: value }, setErrors, errors);
        setForm({ ...form, [property]: value });
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        const newUser = {
            name: form.name,
            email: form.email,
            password: form.password,
        }

        dispatch(login(newUser, "register"));
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
    
    return (
        <div className='log-container'>
        <div className='container-one'>
          <div className='container-two'>
            {loggedIn && <Navigate to="/home" />}
            <Row>
              <Col>
                <Form className="log-form" onSubmit={handleSubmit}>    
                  <Link to="/" className="go-back">
                    <FaArrowLeft />   
                  </Link>
                  <div><h2>Sign Up</h2></div>
                  <div className="mb-3">
                    <label className="form-label"><FaUser/> Name:</label>
                    <input type='text' className="form-control" value={form.name} onChange={handleChange} name='name' />
                    {errors.name && <span className="text-danger">{errors.name}</span>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><FaEnvelope /> Email:</label>
                    <input type='email' className="form-control" value={form.email} onChange={handleChange} name='email' />
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                    {logError && <p className="text-danger">{logError}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><FaLock/> Password:</label>
                    <input type='password' className="form-control" value={form.password} onChange={handleChange} name='password' />
                    {errors.password && <span className="text-danger">{errors.password}</span>}
                  </div>
                  <Button type='submit' variant="primary" className="submit" disabled={!form.name || !form.email || !form.password || errors.name || errors.email || errors.password}>Create User</Button>
                  <h6>or</h6>
                  <Button onClick={handleGoogleSignIn} variant='danger' className="submit">Sign in with Google</Button>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
};

export default Log;
