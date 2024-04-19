import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchActionDetail, updateAction, getCategoryExpense, getCategoryIncome } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Modal from './Modal';
import ModalHome from '../Modals/ModalHome';
import './ActionDetail.css'
import NavBar from '../NavBar/NavBar';
import { FaArrowLeft } from 'react-icons/fa';


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

  //Estado para controlar la visiblidad del Modal que informa actualización exitosa
  const [showModalHome, setShowModalHome] = useState(false);

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
    const { pending, ...updatedDataWithoutPending } = updatedData;
    const updatedDataWithPending = { ...updatedDataWithoutPending, pending: true };
    // Usa el 'id' de 'useParams', no de 'updatedData'
    await dispatch(updateAction(id, updatedDataWithoutPending));
    dispatch(fetchActionDetail(id));
    closeModal();
    setShowModalHome(true);           //Después de que se complete la actualización se muestra el Modal con el mensaje de éxito
  };

  const openModal = () => {
    // Inicializa 'updatedData' con los valores actuales de la acción
    setUpdatedData({
      date: fechaFormateada,
      quantity: action.quantity,
      idCategory: action.type === 'ingresos' ? action.categoryIncome.id : action.categoryBill.id,
      paymentMethod: action.paymentMethod,
      description: action.description
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); 
  };

  return (
    <>
      <NavBar/>
    <div className="content-container" style={{ position: 'relative', top: '170px' }}>
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
          <Button onClick={handleUpdate}>Actualizar</Button>
          <Button onClick={closeModal}>Cancelar</Button>
        </Modal>
      )}
      
      <div className='container-principal'>
        <div className="card-container">
        <div className='back-button'>
        <button  onClick={handleClick}><FaArrowLeft /></button>
        </div>
        <Card className="card shadow-sm">
          <Card.Body className="card-body p-4">
            <Card.Title className='text-center mb-3'>Movimiento</Card.Title>
            <Card.Text>
              <div className="form-group">
                <label>Tipo:</label>
                <input type="text" className="form-control" value={action?.type} disabled />
              </div>
              <div className="form-group">
                <label>Fecha:</label>
                <input type="text" className="form-control" value={fechaFormateada} disabled />
              </div>
              <div className="form-group">
                <label>Cantidad:</label>
                <input type="text" className="form-control" value={action?.quantity} disabled />
              </div>
              <div className="form-group">
                <label>Categoría:</label>
                <input type="text" className="form-control" value={action?.type === 'ingresos' ? action?.categoryIncome?.name : action?.categoryBill?.name} disabled />
              </div>
              {action?.type === 'ingresos'? 
                <div className="form-group">
                  <label>Método de cobro:</label>
                  <input type="text" className="form-control" value={action?.paymentMethod} disabled />
                </div> :
                <div className="form-group">
                  <label>Método de pago:</label>
                  <input type="text" className="form-control" value={action?.paymentMethod} disabled />
                </div>
              }
              {action?.description && 
                <div className="form-group">
                  <label>Descripción:</label>
                  <p>{action?.description}</p>
                </div>
              }
            </Card.Text>
            <div className="d-grid gap-2">
              <Button className="action-detail-button d-block" onClick={openModal}>Editar</Button>
            </div>
          </Card.Body>
        </Card>
        </div>
      </div>
      <ModalHome show={showModalHome} handleClose={() => setShowModalHome(false)} />
    </div>
    </>
  );
};

export default ActionDetail;