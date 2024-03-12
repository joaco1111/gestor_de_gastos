import { Link } from 'react-router-dom'
import { useState } from 'react'
import { validate } from '../../utils'

const Loggin = () => {
    const[form, setForm] = useState({
        email: '',
        password: ''
    });

    const[errors, setErrors] = useState({
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
        event.preventDefault();                                                //Para evitar que al hacer click en Loggin se recargue la página y se me borren los datos ingresados
    };

    return(
        <form onSubmit={handleSubmit}>
            <h1>Loggin</h1>
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
            <button type='submit'>Loggin</button>
            <div>
                <Link>¿Forgot password?</Link>
                <br />
                <Link>Log</Link>
            </div>
        </form>
    )
};

export default Loggin;