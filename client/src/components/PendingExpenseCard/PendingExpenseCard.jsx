import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './PendingExpenseCard.css';

const PendingExpenseCard = ({ action, onDelete, onMarkPaid }) => {
    return (
        <Card className="pending-expense-card">
            <Card.Body>
                <Card.Title>
                    {action.categoryBill ? action.categoryBill.name : 'No especificada'}
                </Card.Title>
                <Card.Text>
                    Fecha: {action.date}
                </Card.Text>
                <Card.Text>
                    Cantidad: {action.quantity}
                </Card.Text>
                <Card.Text>
                    Método de Pago: {action.paymentMethod}
                </Card.Text>
                <Card.Text>
                    Descripción: {action.description}
                </Card.Text>
                <Button variant="danger" onClick={() => onDelete(action.id)}>
                    Eliminar
                </Button>
                <Button variant="success" onClick={() => onMarkPaid(action.id)}>
                    Pagado
                </Button>
            </Card.Body>
        </Card>
    );
};

export default PendingExpenseCard;
