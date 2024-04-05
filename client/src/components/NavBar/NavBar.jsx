import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import nav from '../../assets/nav.png';
import "./navBar.css";
import {  useDispatch, useSelector } from 'react-redux';
import { BsPersonCircle } from "react-icons/bs";
import {cleanUser} from '../../redux/actions';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';



const localToken = JSON.parse(window.localStorage.getItem('loggedNoteAppUser'));

const config = {
    headers: {
      token: localToken?.tokenUser
    }
};

function NavBar() {
  // Función que maneja el botón Logout
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [urlImage, setUrlImage] = useState(null);
  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser');
    const obj = {
      tokenUser: '',
      email: '',
      password: ''
    };
    dispatch(cleanUser(obj));
  };

  const getUser = async()=> {
    try {
      const userResult = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/user/${user.idUser}`, config);

      setUrlImage(userResult.data.photoProfile);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  // imagen si está definida o icono de Font Awesome
  const renderProfileContent = () => {
    if (urlImage) {
      return (
        <img src={urlImage} alt="Perfil" className="profile-image" />
      );
    } else {
      return (
        <BsPersonCircle />
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: '#ffb703' }}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/home">
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
              <NavLink className="nav-link" to="/collaboration">Colaboracion</NavLink>
            </li>

            {user.idAccess === 1 && (
                <li className="nav-item">
              <NavLink exact className="nav-link" to="/admin">Admin</NavLink>
            </li>
            )}
           
          </ul>
          <ul className="navbar-nav">
<<<<<<< HEAD
            
=======

              {/* foto de perfil del usuario con su nombre  */}
              
           {/* <li className="nav-item nav-perfil">
                {renderProfileContent()} 
                  nombre del usuario o admin
                {user.name}
            </li> */}
>>>>>>> 21334f20f6b4acd9de8ac8362c0598f62f39bb61
            <li className="nav-item">
            <DropdownButton title="Menú">
              <Dropdown.Item href="">
                <NavLink className="nav-link" to="/profile">Perfil</NavLink>
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <NavLink className="nav-link" to="#" onClick={handleLogout}>Logout</NavLink>
              </Dropdown.Item>
            </DropdownButton>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


export default NavBar;
