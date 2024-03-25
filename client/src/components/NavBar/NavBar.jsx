<<<<<<< HEAD
import React from 'react';
=======
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import nav from '../../assets/nav.png';
import "./navBar.css"


function NavBar() {
  // Función que maneja el botón Logout
  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedNoteAppUser');
    const obj = {
      tokenUser: '',
      email: '',
      password: ''
    };
    dispatch(cleanUser(obj));
  };

  return (
<<<<<<< HEAD
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
=======
    <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: '#ffb703' }}>
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={nav} className="logo" alt="Logo" style={{ maxWidth: '150px', maxHeight: '50px' }} />
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/detailsLog">Movimientos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/users">Usuarios</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/collaboration">Donar</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="#" onClick={handleLogout}>Logout</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
