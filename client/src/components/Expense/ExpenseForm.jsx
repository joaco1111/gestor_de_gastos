import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense } from '../../redux/actions';

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const categories = useSelector(state => state.categories);

  useEffect(() => {
    // Llamar a la acción para obtener las categorías cuando se monta el componente
    dispatch(getCategories());
  }, [dispatch]);

  const onSubmit = data => {
    // Envía los datos del formulario al servidor
    dispatch(addExpense(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="type">Tipo de acción (ingresos/gastos)</label>
      <select id="type" name="type" ref={register({ required: true })}>
        <option value="ingresos">Ingresos</option>
        <option value="gastos">Gastos</option>
      </select>
      {errors.type && <span>Este campo es requerido</span>}

      <label htmlFor="quantity">Cantidad</label>
      <input type="number" id="quantity" name="quantity" ref={register({ required: true })} />
      {errors.quantity && <span>Este campo es requerido</span>}

      <label htmlFor="date">Fecha</label>
      <input type="date" id="date" name="date" ref={register({ required: true })} />
      {errors.date && <span>Este campo es requerido</span>}

      <label htmlFor="idCategory">Categoría</label>
      <select id="idCategory" name="idCategory" ref={register({ required: true })}>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      {errors.idCategory && <span>Este campo es requerido</span>}

      <button type="submit">Enviar</button>
    </form>
  );
};

export default ExpenseForm;



// import { useState } from 'react';
// import useCategories from './useCategories'; 
// import styles from './ExpenseForm.module.css';
// import { useDispatch } from 'react-redux'
// import { addExpense } from '../../redux/actions';


// const ExpenseForm = () => {
//   const dispatch = useDispatch()

//   const { categories, addCategory } = useCategories();

//   const [amount, setAmount] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [newCategory, setNewCategory] = useState('');
//   const [date, setDate] = useState('');
//   const [comment, setComment] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState(''); 

//   const handleAddExpense = () => {
//     const expenseData = {
//       amount,
//       category: selectedCategory || newCategory,
//       date,
//       comment,
//       paymentMethod
//     };
//     // console.log(expenseData);
//   };

//   return (
//     <div className={styles.container}>
//       <h2>Gasto</h2>
//       <div className={styles.inputContainer}>
//         <label className={styles.label}>Monto:</label>
//         <input
//           className={styles.textInput}
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />
//       </div>
//       <div className={styles.inputContainer}>
//         <label className={styles.label}>Categoría:</label>
//         <select
//           className={styles.selectInput}
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           <option value="">Seleccionar categoría</option>
//           {categories.map((category, index) => (
//             <option key={index} value={category}>{category}</option>
//           ))}
//         </select>
//         <input
//           className={styles.textInput}
//           type="text"
//           placeholder="Nueva categoría"
//           value={newCategory}
//           onChange={(e) => setNewCategory(e.target.value)}
//         />
//         <button className={styles.addButton} onClick={() => addCategory(newCategory)}>Agregar Categoría</button>
//       </div>
//       <div className={styles.inputContainer}>
//         <label className={styles.label}>Forma de Pago:</label>
//         <select
//           className={styles.selectInput}
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//         >
//           <option value="">Seleccionar forma de pago</option>
//           <option value="Efectivo">Efectivo</option>
//           <option value="Tarjeta de Débito">Tarjeta de Débito</option>
//           <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
//           <option value="Transferencia">Transferencia</option>
//         </select>
//       </div>
//       <div className={styles.inputContainer}>
//         <label className={styles.label}>Fecha:</label>
//         <input
//           className={styles.textInput}
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />
//       </div>
//       <div className={styles.inputContainer}>
//         <label className={styles.label}>Comentario (opcional):</label>
//         <textarea
//           className={styles.textInput}
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         />
//       </div>
//       <button className={styles.addButton} onClick={handleAddExpense}>Añadir</button>
//     </div>
//   );
// };

// export default ExpenseForm;
