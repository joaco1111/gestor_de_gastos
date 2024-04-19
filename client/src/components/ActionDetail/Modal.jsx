import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({ onClose, updatedData = {}, handleInputChange, handleUpdate, action, incomeCategories, expenseCategories }) => {
    if (updatedData.pending === undefined) {
        updatedData.pending = true;
    }
    return (
        <Modal show={true} onHide={onClose} centered style={{ maxWidth: '350px', margin: '0 auto', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Modal.Header>
                <Modal.Title>Editar Movimiento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontWeight: 'bold' }}>Fecha:</label>
                    <input
                        type="date"
                        name="date"
                        value={updatedData.date || ''}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontWeight: 'bold' }}>Cantidad:</label>
                    <input
                        type="text"
                        name="quantity"
                        value={updatedData.quantity || ''}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontWeight: 'bold' }}>Categoría:</label>
                    <select
                        name="idCategory"
                        value={updatedData.idCategory || ''}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        <option value="">Seleccionar categoría</option>
                        {(action?.type === 'ingresos' ? incomeCategories : expenseCategories).map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    {action?.type === 'ingresos' ? <label style={{ fontWeight: 'bold' }}>Método de cobro:</label> : <label style={{ fontWeight: 'bold' }}>Método de pago:</label>}
                    <select
                        name="paymentMethod"
                        value={updatedData.paymentMethod || ''}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        <option value="">Seleccionar</option>
                        <option value="efectivo/debito">Efectivo/Debito</option>
                        <option value="transferencia">Transferencia</option>
                        <option value="tarjeta de crédito">Tarjeta de Crédito</option>
                    </select>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontWeight: 'bold' }}>Descripción:</label>
                    <input
                        type="text"
                        name="description"
                        value={updatedData.description || ''}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleUpdate} disabled={!updatedData.date || !updatedData.quantity || !updatedData.idCategory || !updatedData.paymentMethod}>
                    Actualizar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
