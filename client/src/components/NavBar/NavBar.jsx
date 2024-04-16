import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import nav from '../../assets/nav.png';
import "./navBar.css";
import {  useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsPersonCircle } from "react-icons/bs";
import {cleanUser, fetchActions, incrementNumberPuntuacion} from '../../redux/actions';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';



const localToken = JSON.parse(window.localStorage.getItem('loggedNoteAppUser'));

const config = {
    headers: {
      token: localToken?.tokenUser
    }
};

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Función que maneja el botón Logout
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  //limite para mostrar la puntuación
  const numberPuntuacion = useSelector(state => state.numberPuntuacion);
  const totalCount = useSelector(state => state.totalCount);
  const [urlImage, setUrlImage] = useState(null);
  const [activedOffcanvas, setActivedOffcanvas] = useState(false);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser');
    dispatch(cleanUser());
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
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
    //validamos un limite de movimientos para mostrar el offcanvas --> puntuación
    if(totalCount >= numberPuntuacion) setActivedOffcanvas(true);
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

  // funcionalidad de offcanvas para la puntuacion
  const handleClose = (string)=> {
    if(string === "aplazar")  {
      dispatch(incrementNumberPuntuacion(numberPuntuacion + 5))
    }
    setActivedOffcanvas(false)
  }

  return (
    <nav className="navbar navbar-expand-lg  " style={{ backgroundColor: '#ffb703' }}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/home">
          <img src={nav} className="logo" alt="Logo" style={{ maxWidth: '150px', maxHeight: '50px' }} />
        </NavLink>
        <button className="navbar-toggler" type="button" onClick={handleToggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse${isMenuOpen ? ' show' : ''}`} id="navbarNav">
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
              
<<<<<<< HEAD
           {/* <li className="nav-item nav-perfil">
                {renderProfileContent()} 
                  nombre del usuario o admin
                {user.name}
            </li> */}
>>>>>>> 21334f20f6b4acd9de8ac8362c0598f62f39bb61
=======
           <li className="nav-item nav-perfil">
                 
                  {/* nombre del usuario o admin */}
                <h3 className="nav-link" to="#">{renderProfileContent()}{user.name} </h3>
            </li>
>>>>>>> ef1a0c66c54f81882712f6d4c87ca521d431d732
            <li className="nav-item">
            <DropdownButton title="Menú">
              <Dropdown.Item href="">
                <NavLink className="nav-link" to="/profile">Perfil</NavLink>
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <NavLink className="nav-link" to="#" onClick={()=> setActivedOffcanvas(true)}>Puntuación</NavLink>
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <NavLink className="nav-link" to="#" onClick={handleLogout}>Logout</NavLink>
              </Dropdown.Item>
            </DropdownButton>
            </li>
          </ul>
        </div>
      </div>
      <Offcanvas show={activedOffcanvas} onHide={()=> handleClose("aplazar")} placement='bottom'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className='text-center'>Nivel de satisfacción</Offcanvas.Title>
      </Offcanvas.Header>
        <Offcanvas.Body>
          Aca iría las estrellas y un textArea para que el usuario nos deje un comentario
          <br />
            <Button variant='success' onClick={()=> setActivedOffcanvas(false)}>Continuar</Button>
            <Button variant='danger' onClick={()=> setActivedOffcanvas(false)}g>Cancelar</Button>
        </Offcanvas.Body>
    </Offcanvas>
    </nav>
  );
}


export default NavBar;