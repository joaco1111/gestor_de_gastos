import { Link } from 'react-router-dom'
import { useState } from 'react'

const Form = () => {
    return(
        <form>
            <h1>Loggin</h1>
            <div>
                <label>Email: </label>
                <input></input>
            </div>
            <div>
                <label>Password: </label>
                <input></input>
            </div>
            <button>Loggin</button>
            <div>
                <Link>¿Forgot password?</Link>
                <br />
                <Link>Log</Link>
            </div>
        </form>
    )
};

export default Form;