import { useEffect, useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addExpenseIncome, fetchActions, getCategoryIncome } from '../../redux/actions'; 
import { Container, Button, Form } from 'react-bootstrap'; 
import ModalHome from '../Modals/ModalHome';
import "./incomeForm.css";
import { Paper } from "@mui/material"

const IncomeForm = () => {
  const [show, setShow] = useState(false);        

  const [income, setIncome] = useState({        
    quantity: '',
    date: '',
    idCategory: '',
    description: '',
    paymentMethod:'',
    creditCardName: '',
    cuotas:''
  });

  const handleClose = () => {
    setShow(false);
    setIncome({       
      quantity: '',
      date: '',
      idCategory: '',
      description: '',
      paymentMethod:'',
      creditCardName: '',
      cuotas:''
    });
  };
  
  const handleShow = () => setShow(true);


  const dispatch = useDispatch();
  const categoriesIncome = useSelector(state => state.categorieIncome);

  useEffect(() => {
    dispatch(getCategoryIncome());
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    quantity: Yup.number()
      .required('La cantidad es requerida')
      .positive('La cantidad debe ser un número positivo')
      .typeError('La cantidad debe ser un número'),
    date: Yup.date()
      .required('La fecha es requerida')
      .max(new Date(), 'La fecha no puede ser posterior a la actual'),
    idCategory: Yup.string().required('La categoría es requerida'),
    description: Yup.string()
      .max(80, 'Máximo 80 caracteres'),
    paymentMethod: Yup.string().required('El método de cobro es requerido'),
    creditCardName: Yup.string().when('paymentMethod', {
      is: 'tarjeta de crédito',
      then: Yup.string().required('El tipo de tarjeta de crédito es requerido')
    }),
    cuotas: Yup.number().when('paymentMethod', {
      is: 'tarjeta de crédito',
      then: Yup.number().required('La cantidad de cuotas es requerida')
    })
  });
  
  const handleSubmit = async(values, { resetForm }) => {
    console.log('Datos del formulario INGRESOS:', values)

    const formData = {
      ...values,
      pending: false,
      creditCardName: values.paymentMethod !== 'tarjeta de crédito' ? '' : values.creditCardName,
      cuotas: values.paymentMethod !== 'tarjeta de crédito' ? null : values.cuotas
    };

    await dispatch(addExpenseIncome(formData));
    await dispatch(fetchActions())
    resetForm();

    setIncome({                                 
      quantity: values.quantity,
      date: values.date,
      idCategory: values.idCategory,
      description: values.description,
      paymentMethod: values.paymentMethod,
      creditCardName: values.creditCardName,
      cuotas: values.cuotas 
    });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div>
      <Container>
        <Paper elevation={8} sx={{ p:5, borderRadius: 6}}>
        <Formik
          initialValues={{ type: 'ingresos', quantity: '', date: '', idCategory: '', description: '', paymentMethod: '', creditCardName: '', cuotas: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Form onSubmit={handleSubmit} className='income-form'>
              <div><h2>Ingresos</h2></div>
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
                  className={`form-control  ${touched.date && errors.date && 'is-invalid'}`} 
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
                  className={`form-control ${touched.idCategory && errors.idCategory && 'is-invalid'}`} 
                >
                  <option value="">Seleccionar categoría</option>
                  {categoriesIncome.map(category => (
                    <option key={category.id} value={category.id}>{capitalizeFirstLetter(category.name)}</option>
                  ))}
                </Field>
                <ErrorMessage name="idCategory" component="div" className="invalid-feedback" />
              </Form.Group>

              <Form.Group controlId="paymentMethod">
                <Form.Label>Método de cobro:</Form.Label>
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
                      <option value="Otra">Otra</option>
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

              <Button variant="primary" size="sm" type="submit" onClick={handleShow}>Añadir</Button>
            </Form>
          )}
        </Formik>
        </Paper>
      </Container>
      {show && income.quantity && income.date && income.idCategory && <ModalHome show={show} handleClose={handleClose} />}
    </div>
  );
};

export default IncomeForm;
