import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpenseIncome, getCategoryIncome } from '../../redux/actions'; 
import PieCharts from '../Charts/PieCharts';
import { Form, Button, Container } from 'react-bootstrap';

// import styles from './ExpenseIncomeForm.module.css';

const IncomeForm = () => {
  const dispatch = useDispatch();
  const [pieData, setPieData] = useState([]);
  const [formData, setFormData] = useState({
    type: 'ingresos', // Cambia a 'ingresos'
    quantity: '',
    date: '',
    idCategory: ''
  });
  const categoriesIncome = useSelector(state => state.categorieIncome);

  useEffect(() => {
    dispatch(getCategoryIncome());
  }, [dispatch]);

  useEffect(() => {
    const pieChartData = categoriesIncome.map(category => ({
      name: category.name,
      value: formData.idCategory === category.id ? Number(formData.quantity) : 0
    }));
    setPieData(pieChartData);
  }, [formData, categoriesIncome]);

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
        type: 'ingresos', 
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
      <Form onSubmit={handleSubmit}>
        <h2>Ingresos</h2>
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
            {categoriesIncome.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" size="sm" type="submit">Añadir</Button>
      </Form>
      <PieCharts data={pieData} />
      </Container>
    </div>
  );
};

export default IncomeForm;
