import { useState } from 'react';
import useIncomeCategories from './useIncomeCategories';
import styles from './IncomeForm.module.css'; // Importa los estilos CSS modules

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
    <div className={styles.container}>
      <h2>Ingreso</h2>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Monto:</label>
        <input
          className={styles.textInput}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Categoría:</label>
        <select
          className={styles.selectInput}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Seleccionar categoría</option>
          {incomeCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <input
          className={styles.textInput}
          type="text"
          placeholder="Nueva categoría"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button className={styles.addButton} onClick={() => addIncomeCategory(newCategory)}>Agregar Categoría</button>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Cómo te pagan:</label>
        <select
          className={styles.selectInput}
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
      <div className={styles.inputContainer}>
        <label className={styles.label}>Fecha:</label>
        <input
          className={styles.textInput}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Comentario (opcional):</label>
        <textarea
          className={styles.textInput}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button className={styles.addButton} onClick={handleAddIncome}>Añadir</button>
    </div>
  );
};

export default IncomeForm;
