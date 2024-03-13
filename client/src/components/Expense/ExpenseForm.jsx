import { useState } from 'react';
import useCategories from './useCategories'; //Uso el hook

const ExpenseForm = () => {
  const { categories, addCategory } = useCategories();

  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');

  const handleAddExpense = () => {
   
    const expenseData = {
      amount,
      category: selectedCategory || newCategory,
      date,
      comment
    };
    console.log(expenseData); 
  };

  return (
    <div>
      <h2>Gasto</h2>
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
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nueva categoría"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={() => addCategory(newCategory)}>Agregar Categoría</button>
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
      <button onClick={handleAddExpense}>Añadir</button>
    </div>
  );
};

export default ExpenseForm;
