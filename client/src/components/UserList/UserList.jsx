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

  return (
    <div>
      <NavBar />
      <div className='container'>
        <h2>Lista de usuarios registrados</h2>
        {users.length > 0 ? (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Activo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isActive ? 'Sí' : 'No'}</td>
                  <td>
                    {/* Botón con icono de papelera */}
                    <Button variant="danger" onClick={() => handleCleanUser(user.id)}>
                      <BiTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No hay usuarios registrados.</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, { getUsers, cleanUser })(UserList);
