import { useState } from 'react';
import { validate } from '../../utils';
import axios from 'axios';
import  './log.css';
import { Container, Row, Col } from 'react-bootstrap';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticationFromGoogle } from '../../redux/actions'
import { FaUser, FaEnvelope, FaLock} from 'react-icons/fa';

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


const baseURL = 'http://localhost:3001/auth';

const Log = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const dispatch = useDispatch();

    const[form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const[errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (event) => {                                          //Con esta fn logro que el input sea un reflejo del estado
        const property = event.target.name;                                     
        const value = event.target.value;
        validate({ ...form, [property]: value }, setErrors, errors);           //Quiero validar los datos ingresados al form, cada vez que ocurra un cambio en los inputs(Por esto llamo la fn validate dentro de handleOnChange). A validate NO le paso como parámetro el estado inicial(form) sino el estado modificado{ ...form, [property]: value }, esto se hace para evitar un "delete" en los valores registrados de los inputs 
        setForm({ ...form, [property]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const newUser = {
            name: form.name,
            email: form.email,
            password: form.password,
        }

        axios.post(`${baseURL}/register`, newUser)       
            .then(res => alert('Successfully created user'))
            .catch(err => alert(err));

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
        <Container>
        {loggedIn && <Navigate to="/home" />}
        <Row className="justify-content-center align-items-center 'login-container'">
            <Col xs={12} md={6}>
                {/* <h1>Log</h1> */}
                <form onSubmit={handleSubmit} className='log-form'>
                    <div><h2>Log</h2></div>
                    <div className="mb-3">
                        <label className="form-label"><FaUser/> Name:</label>
                        <input type='text' className="form-control" value={form.name} onChange={handleChange} name='name' />
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><FaEnvelope /> Email:</label>
                        <input type='email' className="form-control" value={form.email} onChange={handleChange} name='email' />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><FaLock/> Password:</label>
                        <input type='password' className="form-control" value={form.password} onChange={handleChange} name='password' />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button type='submit' className="btn btn-primary" disabled={!form.name || !form.email || !form.password || errors.name || errors.email || errors.password}>Create User</button>
                </form>
                <h4>or</h4>
                <button onClick={handleGoogleSignIn} className="btn btn-danger mt-3">Sign in with Google</button>
            </Col>
        </Row>
    </Container>
    );
};

export default Log;