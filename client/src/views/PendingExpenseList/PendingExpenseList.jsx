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

    const actions = useSelector(state => state.actions);

    useEffect(() => {
        dispatch(fetchActions(page, limit, { pending: true }))
          .then((response) => {

          })
          .catch((error) => {
            console.error('Error al cargar acciones:', error);
          });
    }, [dispatch, page, limit]);

    const handleDelete = (id) => {
        dispatch(deleteAction(id));
    };

    const handleMarkPaid = (id) => {
        const actionToUpdate = actions.find(action => action.id === id);
        if (actionToUpdate) {
            const updatedAction = { ...actionToUpdate, pending: false };
            dispatch(updateAction(id, updatedAction)); // Llama a updateAction con el id y los datos actualizados
        } else {
            console.error('Error: no se encontró la acción con el id dado');
        }
    };

    const pendingExpenses = actions.filter(action => action.type === 'gastos' && action.pending === true);

    return (
        <div className='pending-expense'>
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