import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../redux/actions';
import { Table, Button, Form } from 'react-bootstrap';
// import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import ModalsDisable from '../Modals/ModalsDisable';
import Alert from 'react-bootstrap/Alert';
import ModalsForm from '../Modals/ModalsForm';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { useTheme } from '@mui/material/styles';
import { tokens } from "../../views/Administrador/theme"
import {BsFillTrashFill, BsPersonLock, BsXOctagonFill, BsPersonFillGear} from 'react-icons/bs';


const _URL_CLEAN = `${import.meta.env.VITE_BASE_URL}/auth/user/`;
const _URL_RESTORE = `${import.meta.env.VITE_BASE_URL}/auth/user/restore/`;
const _URL_UNLOCK = `${import.meta.env.VITE_BASE_URL}/auth//unLockUser/`;

const localToken =  JSON.parse(window.localStorage.getItem('loggedNoteAppUser'));

const config = {
      headers: {
        token: localToken?.tokenUser
      }
    }


const UserList = ({ users, getUsers}) => {
  const [message, setMessage] = useState({
    message: '',
    access: false
  });
  const [activated, setActivated] = useState({
    access: false,
    id: ''
  })
  const [activatedForm, setActivateForm] = useState({
    access: false,
    data: ''
  })
  const [activatedDelete, setActivatedDelete] = useState({
    access: false,
    data: ''
  })

  useEffect(() => {
    getUsers("")
    if(message.message !== ''){
      setTimeout(()=> {
        setMessage({
          message: '',
          access: false
        })
      }, 3000)
    }
  }, [getUsers, message]);

  const handleUnlockUser = async(userId) => {
    setActivated({
      access: false,
      id: ''
    })
    axios.delete(_URL_UNLOCK + userId, config)
    .then(res => {
      setMessage({
        message: `El usuario ${res.data.user.name} fue desactivado.`,
        access: true,
        type: "danger"
      })})
    .catch(error => setMessage({
          message: 'Lo siento ha ocurrido un error al intentar desactivar el usuario',
          access: true,
          type: "danger"
        }))
  };

  const handleCleanUser = (userId)=> {
    setActivatedDelete({
      access: false,
      id: userId
    })
    axios.delete(_URL_CLEAN + userId, config)
    .then(res => {
      setMessage({
        message: `El usuario ${res.data.user.name} fue Eliminado.`,
        access: true,
        type: "danger"
      })})
    .catch(error => setMessage({
          message: 'Lo siento ha ocurrido un error al intentar eliminar el usuario',
          access: true,
          type: "danger"
        }))
  }

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

  const handlerChange = (e) => {
    getUsers(e.target.value.toLowerCase());
  }
  
  const toCase = (value) => {
    const str = value.split(" ");

    return str.map(p => p[0].toUpperCase() + p.slice(1)).join(" ");
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div>
      {/* <NavBar /> */}
      <div className='container'>
        <h2 className='text-center my-4'>Lista de usuarios registrados</h2>

        {/* MENSAJES DE ACCESS O ERROR */}
        {message.access &&(
          <Alert variant={message?.type === "danger" ? "danger" : "success"}>
            {message.message}
          </Alert>
        )}

      {/* SEARCHS */}
        <Form className="d-flex" role="search">
          <Form.Group>
            <Form.Control className="form-control my-2" placeholder='Buscar Usuario...' type='text' onChange={handlerChange}/>
          </Form.Group>
        </Form>

        {/* TABLA  */}
        {users.length > 0 ? (
          <Table striped hover variant="secondary">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Activo</th>
                <th>Fecha de creación</th>
                <th>Fecha desactivado</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{toCase(user.name)}</td>
                  <td>{user.email}</td>
                  <td>{user.deletedAt === null ? 'Sí' : 'No'}</td>
                  <td>{user.createdAt}</td>
                  <td>{user.deletedAt}</td>
                  {/* Boton dehabilitar usuario */}
                  <td>
                    {user.deletedAt !== null ? (
                      <Button variant="danger"  onClick={() => handleRestoreUser(user.id)}>
                        < PersonOffIcon   />
                    </Button>
                    ): (
                      <Button variant="success" onClick={() =>{
                        setActivated({
                          access: true,
                          id: user.id
                        })
                      }}>
                        < BsPersonLock/>
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
                     < BsXOctagonFill />
                    </Button>
                    ): (
                      <Button variant="success" onClick={() => setActivateForm({
                        access: true,
                        data: user
                      })}>
                      <BsPersonFillGear  />
                    </Button>

                    )}
                    
                  </td>

                  {/* BOTON ELIMINAR POR COMPLETO */}
                  <td>
                    {user.deletedAt !== null ? (
                      <Button variant="danger" onClick={() => setMessage({
                        message: 'Usuario deshabilitado, activalo para poder eliminarlo por completo!',
                        access: true,
                        type: "danger"
                        })}>
                     < BsFillTrashFill  />
                    </Button>
                    ): (
                      <Button variant="success" onClick={() => setActivatedDelete({
                        access: true,
                        id: user.id
                      })}>
                      <BsFillTrashFill  />
                    </Button>

                    )}
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No hay usuarios registrados.</p>
        )}

        {/* MODALS DESHABILITAR USUARIO */}
        {activated.access && <ModalsDisable id={activated.id} activated={activated.access} title={`Confirmar Deshabilitación`} body={`¿Seguro que deseas deshabilitar este usuario?`} functionAccess={handleUnlockUser} setAccess={setActivated} colors={colors}/>}

        {/* MODALS ELIMINAR USUARIO */}
        {activatedDelete.access && <ModalsDisable id={activatedDelete.id} activated={activatedDelete.access} title={`Confirmar Eliminación`} body={`¿Seguro que deseas eliminar este usuario?`} functionAccess={handleCleanUser} setAccess={setActivatedDelete} colors={colors}/>}

        {/* MODALS ACTUALIZAR DATOS */}
        {activatedForm.access && <ModalsForm data={activatedForm.data} activatedForm={activatedForm} setActivatedForm={setActivateForm} setMessage={setMessage} colors={colors}/>}
        
        
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, { getUsers })(UserList);
