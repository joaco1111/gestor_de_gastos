import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({ onClose, updatedData = {}, handleInputChange, handleUpdate, action, incomeCategories, expenseCategories }) => {
    return (
        <Modal show={true} onHide={onClose}>
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
                        name="category"
                        value={updatedData.category || ''}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        {(action?.type === 'ingresos' ? incomeCategories : expenseCategories).map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Actualizar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
