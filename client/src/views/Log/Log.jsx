import { useState } from 'react';
import { validate } from '../../utils';
import axios from 'axios';
import style from './Log.module.css';
import { Container, Row, Col } from 'react-bootstrap';

const Log = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
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
        }

        axios.post('URL que me entrega el back', newUser)
            .then(res => alert('Successfully created user'))
            .catch(err => alert(err));
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
                </Col>
            </Row>
        </Container>
    );
};

export default Log;
