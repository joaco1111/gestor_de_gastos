import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActionDetail, updateAction, getCategoryExpense, getCategoryIncome } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Modal from './Modal';
import './ActionDetail.css'
import NavBar from '../NavBar/NavBar';

const ActionDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const action = useSelector(state => state.actionDetail);
  const expenseCategories = useSelector(state => state.categorieExpense);
  const incomeCategories = useSelector(state => state.categorieIncome);
  const [updatedData, setUpdatedData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchActionDetail(id));
    dispatch(getCategoryExpense());
    dispatch(getCategoryIncome());
  }, [dispatch, id]);

  console.log(action)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  let fecha = new Date(action?.date);
  let fechaFormateada = fecha.getUTCFullYear() + '-' + String(fecha.getUTCMonth() + 1).padStart(2, '0') + '-' + String(fecha.getUTCDate()).padStart(2, '0');
  
  const handleUpdate = async () => {
    // Usa el 'id' de 'useParams', no de 'updatedData'
    await dispatch(updateAction(id, updatedData));
    dispatch(fetchActionDetail(id));
    closeModal();
  };

  const openModal = () => {
    // Inicializa 'updatedData' con los valores actuales de la acción
    setUpdatedData({
      date: fechaFormateada,
      quantity: action.quantity,
      idCategory: action.type === 'ingresos' ? action.categoryIncome.id : action.categoryBill.id,
      description: action.description
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <NavBar/>
      <div className='container-principal'>
        <div className="card-container">
          <Card>
            <Card.Body>
              <Card.Title className='text-center'>Movimiento</Card.Title>
              <Card.Text>
                Tipo: {action?.type} <br />
                Fecha: {fechaFormateada} <br />
                Cantidad: {action?.quantity} <br />
                Categoría: {action?.type === 'ingresos' ? action?.categoryIncome?.name : action?.categoryBill?.name} <br />
                Descripción: {action?.description}
              </Card.Text>
              <Button className="action-detail-button" onClick={openModal}>Editar</Button>
            </Card.Body>
          </Card>
          
          {isModalOpen && (
            <Modal 
            onClose={closeModal} 
            updatedData={updatedData} 
            handleInputChange={handleInputChange} 
            handleUpdate={handleUpdate}
            action={action}
            incomeCategories={incomeCategories}
            expenseCategories={expenseCategories}
            >
              <input type="date" name="date" value={updatedData.date || ''} onChange={handleInputChange} />
              <input type="text" name="quantity" value={updatedData.quantity || ''} onChange={handleInputChange} />
              <input type="text" name="description" value={updatedData.description || ''} onChange={handleInputChange} />
              <Button onClick={handleUpdate}>Actualizar</Button>
              <Button onClick={closeModal}>Cancelar</Button>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionDetail;