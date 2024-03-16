import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IncomeExpenseLog = () => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/actions');
        setActions(response.data);
      } catch (error) {
        console.error('Error al obtener las acciones:', error);
      }
    };

    fetchActions();
  }, []);

  return (
    <div>
      {Array.isArray(actions) && actions.length > 0 ? (
        actions.map((action) => (
          <div key={action.id}>
            <p>Tipo: {action.type}</p>
            <p>Fecha: {action.date}</p>
            <p>Cantidad: {action.quantity}</p>
            <p>Categoría de Gastos: {action.Category_bills.name}</p>
            <p>Categoría de Ingresos: {action.Category_income.name}</p>
          </div>
        ))
      ) : (
        <p>Todavía no tienes acciones creadas</p>
      )}
    </div>
  );
};

export default IncomeExpenseLog;