import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions } from "../../redux/actions";
import { Table, Form } from 'react-bootstrap';
import { Box } from "@mui/material";
import Header from "./Header";

const Transactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions);

  console.log(transactions);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [orderBy, setOrderBy] = useState('');

  useEffect(() => {
    dispatch(fetchTransactions(page, limit, search, orderBy, orderDirection));
  }, [dispatch, page, limit, search, orderBy, orderDirection]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleOrderChange = (e) => {
    const { value } = e.target;
    setOrderBy(value);
  };
  
  const handleOrderDirectionChange = (e) => {
    const { value } = e.target;
    setOrderDirection(value);
  };

  const renderTransactions = () => {
    return (
      <div className='container'>
        <Form className="d-flex align-items-end" role="search">
          <Form.Group className="me-3 mb-3">
            <Form.Control className="form-control my-2" placeholder='Buscar Usuario...' type='text' onChange={handleSearchChange}/>
          </Form.Group>
          <Form.Group className="me-3 mb-4">
            <label htmlFor="orderBy" className="form-label">Ordenar por:</label>
            <select className="form-select" id="orderBy" name="orderBy" value={orderBy} onChange={handleOrderChange}>
              <option value="">Seleccionar</option>
              <option value="date">Fecha</option>
              <option value="name">Name</option>
              <option value="amount">Cantidad</option>
            </select>
          </Form.Group>
          <Form.Group className="me-3 mb-4">
            <label htmlFor="orderDirection" className="form-label">Ordenar:</label>
            <select className="form-select" id="orderDirection" name="orderDirection" value={orderDirection} onChange={handleOrderDirectionChange}>
              <option value="DESC">Descendente</option>
              <option value="ASC">Ascendente</option>
            </select>
          </Form.Group>
        </Form>
        <Table striped hover variant="secondary">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions.map(transaction => (
              <tr key={transaction.transactionId}>
                <td>{transaction.transactionId}</td>
                <td>{transaction.name}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TRANSACTIONS" subtitle="Details of Transactions" />
      </Box>
      <div className='container'>
        <h2 className='text-center my-4'>Lista de los usuarios que han donado</h2>
        {renderTransactions()}
      </div>
    </Box>
  );
};

export default Transactions;
