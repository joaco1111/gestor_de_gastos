import React, { useEffect, useState } from 'react';
import PendingExpenseCard from '../../components/PendingExpenseCard/PendingExpenseCard';
import './PendingExpenseList.css';
import NavBar from '../../components/NavBar/NavBar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActions, deleteAction, updateAction } from '../../redux/actions';

const PendingExpenseList = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    // Obteniendo el estado de las acciones pendientes
    const pendingExpenses = useSelector(state => state.actions.filter(action => action.type === 'gastos' && action.pending === true));

    useEffect(() => {
        // Cargar las acciones pendientes al montar el componente
        dispatch(fetchActions(page, limit, { pending: true }))
          .then((response) => {

          })
          .catch((error) => {
            console.error('Error al cargar acciones:', error);
          });
    }, [dispatch, page, limit]);

    const handleDelete = (id) => {
        // Eliminar una acción
        dispatch(deleteAction(id))
          .then(() => {
            // Recargar las acciones pendientes después de eliminar
            dispatch(fetchActions(page, limit, { pending: true }));
          })
          .catch((error) => {
            console.error('Error al eliminar acción:', error);
          });
    };
    
    const handleMarkPaid = (id) => {
        // Marcar una acción como pagada
        const actionToUpdate = pendingExpenses.find(action => action.id === id);
        if (actionToUpdate) {
            const updatedAction = { ...actionToUpdate, pending: false };
            dispatch(updateAction(id, updatedAction)) // Llama a updateAction con el id y los datos actualizados
              .then(() => {
                // Recargar las acciones pendientes después de marcar como pagado
                dispatch(fetchActions(page, limit, { pending: true }));
              })
              .catch((error) => {
                console.error('Error al marcar acción como pagada:', error);
              });
        } else {
            console.error('Error: no se encontró la acción con el id dado');
        }
    };

    return (
        <div className="content-container" style={{ position: 'relative', top: '90px' }}>
            <NavBar />
            <h2>Gastos Pendientes</h2>
            <div className="pending-expense-list">
                {pendingExpenses.length > 0 ? (
                    pendingExpenses.map((action) => (
                        <PendingExpenseCard
                            key={action.id}
                            action={action}
                            onDelete={handleDelete}
                            onMarkPaid={handleMarkPaid}
                        />
                    ))
                ) : (
                    <p>No hay gastos pendientes</p>
                )}
            </div>
        </div>
    );
};

export default PendingExpenseList;