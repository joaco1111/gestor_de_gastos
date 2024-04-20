import { useEffect, useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addExpenseIncome, fetchActions, getCategoryExpense } from '../../redux/actions'; 
import { Container, Button, Form } from 'react-bootstrap'; 
import ModalHome from '../Modals/ModalHome';
import "./expenseForm.css";
import { Paper } from "@mui/material"

const ExpenseForm = () => {
  const [show, setShow] = useState(false);        

  const [expense, setExpense] = useState({        
    quantity: '',
    date: '',
    idCategory: '',
    description: '',
    paymentMethod:'',
    creditCardName: '',
    cuotas:''
  });

  const [pending, setPending] = useState(true); // Estado separado para pending

  const isDateValid = (dateString) => {
    const currentDate = new Date();
    const selectedDate = new Date(dateString);
    return selectedDate <= currentDate;
  };

  const handleClose = () => {
    setShow(false);
    resetExpense(); // Resetear el estado del gasto
  };
  
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const categoriesExpense = useSelector(state => state.categorieExpense);

  useEffect(() => {
    dispatch(getCategoryExpense());
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    quantity: Yup.number()
      .required('La cantidad es requerida')
      .positive('La cantidad debe ser un número positivo')
      .typeError('La cantidad debe ser un número'),
    date: Yup.date()
      .required('La fecha es requerida'),
    idCategory: Yup.string().required('La categoría es requerida'),
    description: Yup.string()
      .max(80, 'Máximo 80 caracteres'),
    paymentMethod: Yup.string().required('El método de pago es requerido'),
    creditCardName: Yup.string().when('paymentMethod', {
      is: 'Tarjeta de Credito',
      then: Yup.string().required('El tipo de tarjeta de crédito es requerido')
    }),
    cuotas: Yup.number().when('paymentMethod', {
      is: 'Tarjeta de Credito',
      then: Yup.number().required('La cantidad de cuotas es requerida')
    })
  });
  
  const handleSubmit = async (values, { resetForm }) => {
    console.log('Datos del formulario:', values)
    const formData = {
        ...values,
        creditCardName: values.paymentMethod !== 'tarjeta de crédito' ? '' : values.creditCardName,
        cuotas: values.paymentMethod !== 'tarjeta de crédito' ? null : values.cuotas,
        pending: pending
    };

    try {
        const expenseData = await dispatch(addExpenseIncome(formData));
        await dispatch(fetchActions(1,100))
        resetForm();

        if (pending) { // Si el gasto está pendiente
          let pendingExpenses = JSON.parse(localStorage.getItem('pendingExpenses')) || [];
          pendingExpenses.push(expenseData); // Asume que expenseData es el gasto que acabas de agregar
          localStorage.setItem('pendingExpenses', JSON.stringify(pendingExpenses));
        }

        setExpense({ // Actualizar el estado del gasto solo si se guardó correctamente                                
            quantity: values.quantity,
            date: values.date,
            idCategory: values.idCategory,
            description: values.description,
            paymentMethod: values.paymentMethod,
            creditCardName: values.creditCardName,
            cuotas: values.cuotas,
            pending: pending // Usar el estado de pending
        });

        console.log('Respuesta del servidor al agregar gasto o ingreso:', expenseData);
    } catch (error) {
        console.error('Error al agregar gasto o ingreso:', error);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const resetExpense = () => {
    setExpense({
      quantity: '',
      date: '',
      idCategory: '',
      description: '',
      paymentMethod:'',
      creditCardName: '',
      cuotas:''
    });
    setPending(true); // Resetear el estado de pending
  };

  return (
    <div>
      <Container>
        <Paper elevation={8} sx={{ p:5, borderRadius: 6 }}>
          <Formik
            initialValues={{ type: 'gastos', quantity: '', date: '', idCategory: '', description: '', paymentMethod: '', creditCardName: '', cuotas: ''}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <Form onSubmit={handleSubmit} className="expense-form">
                <div><h2>Gastos</h2></div>
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
                      <option key={category.id} value={category.id}>{capitalizeFirstLetter(category.name)}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="idCategory" component="div" className="invalid-feedback" />
                </Form.Group>

                <Form.Group controlId="paymentMethod">
                  <Form.Label>Método de Pago:</Form.Label>
                  <Field 
                    as="select" 
                    name="paymentMethod" 
                    value={values.paymentMethod} 
                    onChange={handleChange} 
                    className={`form-control ${touched.paymentMethod && errors.paymentMethod && 'is-invalid'}`} 
                  >
                    <option value="">Seleccionar método de pago</option>
                    <option value="efectivo/debito">Efectivo/Debito</option>
                    <option value="transferencia">Transferencia</option>
                    <option value="tarjeta de crédito">Tarjeta de Crédito</option>
                  </Field>
                  <ErrorMessage name="paymentMethod" component="div" className="invalid-feedback" />
                </Form.Group>

                {values.paymentMethod === 'tarjeta de crédito' && (
                  <div>
                    <Form.Group controlId="creditCardName">
                      <Form.Label>Tipo de Tarjeta:</Form.Label>
                      <Field 
                        as="select" 
                        name="creditCardName" 
                        value={values.creditCardName} 
                        onChange={handleChange} 
                        className={`form-control ${touched.creditCardName && errors.creditCardName && 'is-invalid'}`} 
                      >
                        <option value="">Seleccionar tipo de tarjeta</option>
                        <option value="Visa">Visa</option>
                        <option value="Mastercard">Mastercard</option>
                        <option value="American Express">American Express</option>
                        <option value="American Express">Otra</option>
                      </Field>
                      <ErrorMessage name="creditCardName" component="div" className="invalid-feedback" />
                    </Form.Group>

                    <Form.Group controlId="cuotas">
                      <Form.Label>Cuotas:</Form.Label>
                      <Field 
                        as="select" 
                        name="cuotas" 
                        value={values.cuotas} 
                        onChange={handleChange} 
                        className={`form-control ${touched.cuotas && errors.cuotas && 'is-invalid'}`} 
                      >
                        <option value="">Seleccionar cantidad de cuotas</option>
                        <option value="1">1</option>
                        <option value="3">3</option>
                        <option value="6">6</option>
                        <option value="9">9</option>
                        <option value="12">12</option>
                      </Field>
                      <ErrorMessage name="cuotas" component="div" className="invalid-feedback" />
                    </Form.Group>
                  </div>
                )}

                  <Form.Group controlId="description">
                    <Form.Label>Descripción:</Form.Label>
                    <Field 
                      type="text" 
                      name="description" 
                      value={values.description} 
                      onChange={handleChange} 
                      className={`form-control ${touched.description && errors.description && 'is-invalid'}`} 
                    />
                    <ErrorMessage name="description" component="div" className="invalid-feedback" />
                </Form.Group>

                <Button variant="primary" size="sm" type="submit" onClick={() => setPending(true)}>Pendiente</Button> <br /> <br />
                <Button 
                  variant="primary" 
                  size="sm" 
                  type="submit" 
                  onClick={() => setPending(false)} 
                  disabled={!pending && !isDateValid(values.date)}
                >
                  Agregar
                </Button>
                {!pending && !isDateValid(values.date) && (
                  <div className="invalid-feedback">No se admiten fechas posteriores al día de hoy</div>
                )}
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
      {show && expense.quantity && expense.date && expense.idCategory && <ModalHome show={show} handleClose={handleClose} />}    {/*Condiciono el renderizado del Modal*/}
    </div>
  );
};

export default ExpenseForm;