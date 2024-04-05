import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Link } from 'react-router-dom'
const Failure = () => {


  return (
    <div>
        <NavBar/>
        <h2>Regresaste de la plataforma de pago.</h2>

        <div className="mt-3 text-center">
        
        <Link to='/home'>Ir a home</Link>
        </div>
    </div>
  )
}

export default Failure