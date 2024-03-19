import { useState } from 'react';
import { validate } from '../../utils';
import axios from 'axios';
import style from './Log.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

const baseURL = 'http://localhost:3001/auth';

const Log = () => {
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

        axios.post('http://localhost:3001/auth/register', newUser)
            .then(res => alert('Successfully created user'))
            .catch(err => alert(err));

    };

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
          .then((result) => {
            // Aquí puedes acceder a la información del usuario que ha iniciado sesión con Google
            const user = result.user;
            console.log(user);
          }).catch((error) => {
            // Manejar errores si ocurre alguno durante el inicio de sesión con Google
            console.error(error);
          });
    };

    return (
        <Container>
            <Row className={`justify-content-center align-items-center ${style['login-container']}`}>
                <Col xs={12} md={6}>
                    <h1>Log</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name:</label>
                            <input type='text' className="form-control" value={form.name} onChange={handleChange} name='name' />
                            {errors.name && <span className="text-danger">{errors.name}</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input type='email' className="form-control" value={form.email} onChange={handleChange} name='email' />
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password:</label>
                            <input type='password' className="form-control" value={form.password} onChange={handleChange} name='password' />
                            {errors.password && <span className="text-danger">{errors.password}</span>}
                        </div>
                        <button type='submit' className="btn btn-primary" disabled={!form.name || !form.email || !form.password || errors.name || errors.email || errors.password}>Create User</button>
                    </form>
                    <button onClick={handleGoogleSignIn} className="btn btn-danger mt-3">Sign in with Google</button>
                </Col>
            </Row>
        </Container>
    );
};

export default Log;
