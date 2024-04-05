import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpenseIncome, fetchActions, getCategoryExpense, getCategoryIncome } from '../../redux/actions';
import PieCharts from '../Charts/PieCharts';
import { Form, Button, Container } from 'react-bootstrap';

import styles from './ExpenseIncomeForm.module.css';

const ExpenseIncomeForm = () => {
  const dispatch = useDispatch();
  const [pieData, setPieData] = useState([]);
  const [formData, setFormData] = useState({
    type: 'gastos', // Por defecto, establecemos el tipo como gastos
    quantity: '',
    date: '',
    idCategory: ''
  });
  const categoriesExpense = useSelector(state => state.categorieExpense);
  const categoriesIncome = useSelector(state => state.categorieIncome);

  useEffect(() => {
    dispatch(getCategoryExpense());
    dispatch(getCategoryIncome());
  }, [dispatch]);

  useEffect(() => {
    // Estructurar datos para el gráfico de torta
    const data = formData.type === 'gastos' ? categoriesExpense : categoriesIncome;
    const pieChartData = data.map(category => ({
      name: category.name,
      value: formData.idCategory === category.id ? Number(formData.quantity) : 0
    }));
    setPieData(pieChartData);
  }, [formData, categoriesExpense, categoriesIncome]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExpenseIncome(formData));
    setFormData({
      type: 'gastos',
      quantity: '',
      date: '',
      idCategory: ''
    });
  };

  return (
    <div >
      <Container>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <Form.Group controlId="quantity">
          <Form.Label>Cantidad:</Form.Label>
          <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="type">
          <Form.Label>Tipo de acción:</Form.Label>
          <Form.Control as="select" name="type" value={formData.type} onChange={handleChange}>
            <option value="gastos">Gastos</option>
            <option value="ingresos">Ingresos</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="date">
          <Form.Label>Fecha:</Form.Label>
          <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="idCategory">
          <Form.Label>Categoría:</Form.Label>
          <Form.Control as="select" name="idCategory" value={formData.idCategory} onChange={handleChange}>
            {formData.type === 'gastos' ? (
              categoriesExpense.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))
            ) : (
              categoriesIncome.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))
            )}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" size="sm" type="submit">Añadir</Button>
      </Form>
      <PieCharts data={pieData} />
      </Container>
    </div>
  );
};

export default ExpenseIncomeForm;
