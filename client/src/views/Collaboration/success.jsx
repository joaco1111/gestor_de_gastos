import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
const success = () => {
  return (
    <div>
         <NavBar/>
        <h2>Muchas gracias por tu colaboración.</h2>

        <div className="mt-3 text-center">
        
        <Link to='/home'>Ir a home</Link>
        </div>
    </div>
  )
}

export default success