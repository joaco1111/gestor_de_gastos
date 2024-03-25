<<<<<<< HEAD
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsers, cleanUser } from '../../redux/actions';
import { Table, Button } from 'react-bootstrap';
import { BiTrash } from 'react-icons/bi'; // Importa el ícono de papelera de react-icons
import NavBar from '../NavBar/NavBar';

const UserList = ({ users, getUsers, cleanUser }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleCleanUser = (userId) => {
    cleanUser(userId);
  };

=======
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../redux/actions';
import { Table, Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import ModalsDisable from '../Modals/ModalsDisable';
import Alert from 'react-bootstrap/Alert';
import ModalsForm from '../Modals/ModalsForm';
import Form from 'react-bootstrap/Form';

const _URL_CLEAN = 'http://localhost:3001/auth/user/';
const _URL_RESTORE = 'http://localhost:3001/auth/user/restore/';
const localToken = await JSON.parse(window.localStorage.getItem('loggedNoteAppUser')) ;
const config = {
      headers: {
        token: localToken?.tokenUser
      }
    }

    console.log(config);

const UserList = ({ users, getUsers}) => {
  const [message, setMessage] = useState({
    message: '',
    access: false
  });
  const [user, setUser] = useState({})
  const [activated, setActivated] = useState({
    access: false,
    id: ''
  })
  const [activatedForm, setActivateForm] = useState({
    access: false,
    data: ''
  })

  useEffect(() => {
    getUsers();

    if(message.message !== ''){
      setTimeout(()=> {
        setMessage({
          message: '',
          access: false
        })
      }, 3000)
    }
  }, [getUsers, message]);

  const handleCleanUser = async(userId) => {
    setActivated({
      access: false,
      id: ''
    })
    axios.delete(_URL_CLEAN + userId, config)
    .then(res => {
      setMessage({
        message: `El usuario ${res.data.user.name} fue desactivado.`,
        access: true,
        type: "danger"
      })})
    .catch(error => setMessage({
          message: 'Lo siento ha ocurrido un error al intentar eliminar el usuario',
          access: true,
          type: "danger"
        }))
  };

  const handleRestoreUser = async(userId) => {
     setActivated({
      access: false,
      id: ''
    })
    axios.post(_URL_RESTORE + userId,{} ,config)
    .then(res => {
      setMessage({
        message: `El usuario ${res.data.name} fue activado.`,
        access: true
      })})
    .catch(error => setMessage({
      message: 'Lo siento ha ocurrido un error al intentar activar el usuario',
      access: true,
      type: "danger"
    }))
  }
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
  return (
    <div>
      <NavBar />
      <div className='container'>
<<<<<<< HEAD
        <h2>Lista de usuarios registrados</h2>
=======
        <h2 className='text-center my-4'>Lista de usuarios registrados</h2>

        {/* MENSAJES DE ACCESS O ERROR */}
        {message.access &&(
          <Alert variant={message?.type === "danger" ? "danger" : "success"}>
            {message.message}
          </Alert>
        )}

      {/* SEARCHSBAR TODAVIA NO FUNCIONA */}
        {/* <Form className="d-flex" role="search">
          <Form.Group>
            <Form.Control className="form-control my-2" placeholder='Buscar Usuario...' type='text'/>
          </Form.Group>
          <button className="bi bi-arrow-clockwise"></button>
        </Form> */}

        {/* TABLA  */}
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
        {users.length > 0 ? (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Activo</th>
<<<<<<< HEAD
                <th>Acciones</th>
=======
                <th>Fecha de creación</th>
                <th>Fecha desactivado</th>
                <th></th>
                <th></th>
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
<<<<<<< HEAD
                  <td>{user.isActive ? 'Sí' : 'No'}</td>
                  <td>
                    {/* Botón con icono de papelera */}
                    <Button variant="danger" onClick={() => handleCleanUser(user.id)}>
                      <BiTrash />
                    </Button>
=======
                  <td>{user.deletedAt === null ? 'Sí' : 'No'}</td>
                  <td>{user.createdAt}</td>
                  <td>{user.deletedAt}</td>
                  {/* Boton dehabilitar usuario */}
                  <td>
                    {user.deletedAt !== null ? (
                      <Button variant="danger"  onClick={() => handleRestoreUser(user.id)}>
                      <i className="bi bi-eye-slash"></i>
                    </Button>
                    ): (
                      <Button variant="success" onClick={() =>{
                        setActivated({
                          access: true,
                          id: user.id
                        })
                         }}>
                      <i className="bi bi-eye-fill"></i>
                    </Button>
                    )}
                    
                  </td>
                    {/* Botón actualizar usuario*/}
                  <td>
                    {user.deletedAt !== null ? (
                      <Button variant="danger" onClick={() => setMessage({
                        message: 'Usuario deshabilitado, activalo para poder actualizar los datos',
                        access: true,
                        type: "danger"
                        })}>
                     <i className="bi bi-person-lock"></i>
                    </Button>
                    ): (
                      <Button variant="success" onClick={() => setActivateForm({
                        access: true,
                        data: user
                      })}>
                      <i className="bi bi-person-fill-gear"></i>
                    </Button>

                    )}
                    
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No hay usuarios registrados.</p>
        )}
<<<<<<< HEAD
=======

        {/* MODALS DESHABILITAR USUARIO */}
        {activated.access && <ModalsDisable id={activated.id} activated={activated.access} title={`Confirmar Deshabilitación`} body={`¿Seguro que deseas deshabilitar este usuario?`} functionAccess={handleCleanUser} setAccess={setActivated}/>}

        {/* MODALS ACTUALIZAR DATOS */}
        {activatedForm.access && <ModalsForm data={activatedForm.data} activatedForm={activatedForm} setActivatedForm={setActivateForm} setMessage={setMessage}/>}
        
        
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users
});

<<<<<<< HEAD
export default connect(mapStateToProps, { getUsers, cleanUser })(UserList);
=======
export default connect(mapStateToProps, { getUsers })(UserList);
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
