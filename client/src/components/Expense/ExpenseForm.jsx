<<<<<<< HEAD
import React, { useEffect } from 'react';
=======
import { useEffect, useState } from 'react';
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addExpenseIncome, getCategoryExpense } from '../../redux/actions'; 
import { Container, Button, Form } from 'react-bootstrap'; 
<<<<<<< HEAD

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const categoriesExpense = useSelector(state => state.categorieExpense);

  useEffect(() => {
    dispatch(getCategoryExpense());
  }, [dispatch]);

=======
import ModalHome from '../Modals/ModalHome';
import "./expenseForm.css";

const ExpenseForm = () => {
  const [show, setShow] = useState(false);        //Estado para mostrar y ocultar el Modal
  console.log(show);

  const [expense, setExpense] = useState({        //Estado para no permitir que aparezca el Modal, si los 3 inputs NO están llenos
    quantity: '',
    date: '',
    idCategory: '',
  });

  const handleClose = () => {
    setShow(false);
    setExpense({       
      quantity: '',
      date: '',
      idCategory: '',
    });
  };
  const handleShow = () => setShow(true);


  const dispatch = useDispatch();
  const categoriesExpense = useSelector(state => state.categorieExpense);

  useEffect(() => {
    dispatch(getCategoryExpense());
  }, [dispatch]);

>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
  const validationSchema = Yup.object().shape({
    quantity: Yup.number()
      .required('La cantidad es requerida')
      .positive('La cantidad debe ser un número positivo')
      .typeError('La cantidad debe ser un número'),
    date: Yup.date()
      .required('La fecha es requerida')
      .max(new Date(), 'La fecha no puede ser posterior a la actual'),
    idCategory: Yup.string().required('La categoría es requerida')
  });
<<<<<<< HEAD

=======
  console.log(validationSchema);
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
  const handleSubmit = (values, { resetForm }) => {
    console.log('Datos del formulario:', values)
    dispatch(addExpenseIncome(values));
    resetForm();
<<<<<<< HEAD
=======

    setExpense({                                 
      quantity: values.quantity,
      date: values.date,
      idCategory: values.idCategory
    });
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
  };

  return (
    <div>
      <Container>
<<<<<<< HEAD
        <h2>Gastos</h2>
=======
  
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
        <Formik
          initialValues={{ type: 'gastos', quantity: '', date: '', idCategory: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
<<<<<<< HEAD
            <Form onSubmit={handleSubmit}>
=======
            <Form onSubmit={handleSubmit} className="expense-form">
              <div><h2>Gastos</h2></div>
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
              <Form.Group controlId="quantity">
                <Form.Label>Cantidad:</Form.Label>
                <Field 
                  type="number" 
                  name="quantity" 
                  value={values.quantity} 
                  onChange={handleChange} 
                  className={`form-control  ${touched.quantity && errors.quantity && 'is-invalid'}`} 
                />
                <ErrorMessage name="quantity" component="div" className="invalid-feedback" />
              </Form.Group>

              <Form.Group controlId="date">
                <Form.Label>Fecha:</Form.Label>
                <Field 
                  type="date" 
                  name="date" 
                  value={values.date} 
                  onChange={handleChange} 
                  className={`form-control ${touched.date && errors.date && 'is-invalid'}`} 
                />
                <ErrorMessage name="date" component="div" className="invalid-feedback" />
              </Form.Group>

              <Form.Group controlId="idCategory">
                <Form.Label>Categoría:</Form.Label>
                <Field 
                  as="select" 
                  name="idCategory" 
                  value={values.idCategory} 
                  onChange={handleChange} 
                  className={`form-control  ${touched.idCategory && errors.idCategory && 'is-invalid'}`} 
                >
                  <option value="">Seleccionar categoría</option>
                  {categoriesExpense.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </Field>
                <ErrorMessage name="idCategory" component="div" className="invalid-feedback" />
              </Form.Group>

<<<<<<< HEAD
              <Button variant="primary" size="sm" type="submit">Añadir</Button>
=======
              <Button variant="primary" size="sm" type="submit" onClick={handleShow}>Añadir</Button>
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
            </Form>
          )}
        </Formik>
      </Container>
<<<<<<< HEAD
=======
      {show && expense.quantity && expense.date && expense.idCategory && <ModalHome show={show} handleClose={handleClose} />}    {/*Condiciono el renderizado del Modal*/}
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
    </div>
  );
};

export default ExpenseForm;
