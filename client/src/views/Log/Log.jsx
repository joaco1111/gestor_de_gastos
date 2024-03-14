import { useState } from 'react';
import { validate } from '../../utils';
import axios from 'axios';
import style from './Log.module.css';

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
        //Aquí se crea el usuario, una vez se defina la URL para el post desde el back
        axios.post('URL que me entrega el back', newUser)                      //Como segundo parámetro del .post() va el usuario a crear
        .then(res => alert('Successfully created user'))
        .catch(err => alert(err));
    };

    return(
        <form onSubmit={handleSubmit} className={style['login-container']}>
            <h1>Log</h1>
            <div>
                <label>Name: </label>
                <input type='text' value={form.name} onChange={handleChange} name='name'></input>
                {errors.name && <span>{errors.name}</span>}
            </div>
            <div>
                <label>Email: </label>
                <input type='email' value={form.email} onChange={handleChange} name='email'></input>
                {errors.email && <span>{errors.email}</span>}
            </div>
            <div>
                <label>Password: </label>
                <input type='password' value={form.password} onChange={handleChange} name='password'></input>
                {errors.password && <span>{errors.password}</span>}
            </div>
            <button type='submit' disabled={!form.name || !form.email || !form.password || errors.name || errors.email || errors.password}>Create User</button>
        </form>
    )
};

export default Log;