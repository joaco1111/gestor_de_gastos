import { useState } from 'react';
import useIncomeCategories from './useIncomeCategories'; 

const IncomeForm = () => {
  const { incomeCategories, addIncomeCategory } = useIncomeCategories();

  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleAddIncome = () => {
    const incomeData = {
      amount,
      category: selectedCategory || newCategory,
      date,
      comment,
      paymentMethod
    };
    console.log(incomeData);
  };

  return (
    <div>
      <h2>Ingreso</h2>
      <div>
        <label>Monto:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Categoría:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Seleccionar categoría</option>
          {incomeCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nueva categoría"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={() => addIncomeCategory(newCategory)}>Agregar Categoría</button>
      </div>
      <div>
        <label>Cómo te pagan:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Seleccionar forma de pago</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta de Débito">Tarjeta de Débito</option>
          <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
          <option value="Transferencia">Transferencia</option>
        </select>
      </div>
      <div>
        <label>Fecha:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      
      <div>
        <label>Comentario (opcional):</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button onClick={handleAddIncome}>Añadir</button>
    </div>
  );
};

export default IncomeForm;
