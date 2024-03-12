import { useState } from 'react'
import { validate } from '../../utils'

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

    return(
        <form>
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
            <button type='submit'>Create User</button>
        </form>
    )
};

export default Log;