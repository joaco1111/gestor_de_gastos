import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { BsCameraFill } from 'react-icons/bs';
import { Container, Row, Col } from 'react-bootstrap';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticationFromGoogle } from '../../redux/actions';
import { validate } from '../../utils';
import './Log.css';

const firebaseConfig = {
  apiKey: "AIzaSyAqsU0vjIZ1BfA_oeiLOpaGHZONUt02uMk",
  authDomain: "gestor-de-pago.firebaseapp.com",
  projectId: "gestor-de-pago",
  storageBucket: "gestor-de-pago.appspot.com",
  messagingSenderId: "357483683234",
  appId: "1:357483683234:web:d5ce922a345680f14326fb",
  measurementId: "G-D15CHFV0VP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const baseURL = 'http://localhost:3001/auth';

const Log = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const dispatch = useDispatch();

    const [form, setForm] = useState({
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

    const handleSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            name: form.name,
            email: form.email,
            password: form.password,
        };

        axios.post(`${baseURL}/register`, newUser)
            .then(res => {
                alert('Usuario creado exitosamente');
                setLoggedIn(true);
            })
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

    const handleImageUpload = async (event) => {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);

        try {
            const response = await axios.post('http://localhost:3001/upload', formData);
            console.log(response.data.url); // URL de la imagen subida
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
        }
    };

    return (
        <Container>
            {loggedIn && <Navigate to="/home" />}
            <Row className="justify-content-center align-items-center login-container">
                <Col xs={12} md={6}>
                    <form onSubmit={handleSubmit} className='log-form'>
                        <div className="d-flex justify-content-end mb-3">
                            <label htmlFor="fileInput" className="btn btn-outline-primary mb-0 me-2">
                                <BsCameraFill /> Subir foto
                                <input type="file" accept="image/*" id="fileInput" className="d-none" onChange={handleImageUpload} />
                            </label>
                        </div>
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
                            <h4>or</h4>
                        <button onClick={handleGoogleSignIn} className="btn btn-danger mt-3">Sign in with Google</button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default Log;
