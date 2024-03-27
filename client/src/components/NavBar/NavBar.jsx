import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import nav from '../../assets/nav.png';
import "./navBar.css"
import { connect } from 'react-redux';


function NavBar({user}) {
  // Función que maneja el botón Logout

  console.log(user);

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
    <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: '#ffb703' }}>
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
            {user.idAccess === 1 && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">Usuarios</NavLink>
                </li>
            )}
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

const mapStateToProps = state => {
  return {
    user: state.user  
  }
}

export default connect(mapStateToProps)(NavBar);
