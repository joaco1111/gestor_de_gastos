import React, { useEffect } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addExpenseIncome, getCategoryIncome } from '../../redux/actions'; 
import PieCharts from '../Charts/PieCharts';
import { Container, Button, Form } from 'react-bootstrap'; 

const IncomeForm = () => {
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
    idCategory: Yup.string().required('La categoría es requerida')
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log('Datos del formulario INGRESOS:', values)
    dispatch(addExpenseIncome(values));
    resetForm();
  };

  return (
    <div>
      <Container>
        <h2>Ingresos</h2>
        <Formik
          initialValues={{ type: 'ingresos', quantity: '', date: '', idCategory: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
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
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </Field>
                <ErrorMessage name="idCategory" component="div" className="invalid-feedback" />
              </Form.Group>

              <Button variant="primary" size="sm" type="submit">Añadir</Button>
            </Form>
          )}
        </Formik>
        {/* <PieCharts data={[]} /> */}
      </Container>
    </div>
  );
};

export default IncomeForm;
