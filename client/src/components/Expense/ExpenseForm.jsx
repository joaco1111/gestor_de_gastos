import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpenseIncome, getCategoryExpense } from '../../redux/actions'; 
import PieCharts from '../Charts/PieCharts';
import { Form, Button, Container } from 'react-bootstrap';

// import styles from './ExpenseIncomeForm.module.css';

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const [pieData, setPieData] = useState([]);
  const [formData, setFormData] = useState({
    type: 'gastos',
    quantity: '',
    date: '',
    idCategory: ''
  });
  const categoriesExpense = useSelector(state => state.categorieExpense);

  useEffect(() => {
    dispatch(getCategoryExpense());
  }, [dispatch]);

  useEffect(() => {
    const pieChartData = categoriesExpense.map(category => ({
      name: category.name,
      value: formData.idCategory === category.id ? Number(formData.quantity) : 0
    }));
    setPieData(pieChartData);
  }, [formData, categoriesExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.quantity && formData.date && formData.idCategory) {
      dispatch(addExpenseIncome(formData));
      setFormData({
        type: 'gastos', 
        quantity: '',
        date: '',
        idCategory: ''
      });
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  return (
    <div >
      <Container>
      <Form  onSubmit={handleSubmit}>
        <h2>Gastos</h2>
        <Form.Group controlId="quantity">
          <Form.Label>Cantidad:</Form.Label>
          <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="date">
          <Form.Label>Fecha:</Form.Label>
          <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="idCategory">
          <Form.Label>Categoría:</Form.Label>
          <Form.Control as="select" name="idCategory" value={formData.idCategory} onChange={handleChange}>
          <option value="">Seleccionar categoría</option>
            {categoriesExpense.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" size="sm" type="submit">Añadir</Button>
      </Form>
      {/* <PieCharts data={pieData} /> */}
      </Container>
    </div>
  );
};

export default ExpenseForm;
