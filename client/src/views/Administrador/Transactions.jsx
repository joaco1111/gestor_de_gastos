import useSWR from 'swr';
import React, { useEffect, useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import { Box } from "@mui/material";
import Header from './Header'
import ActionsPagination from '../../components/Pagination/ActionsPagination';

const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');

var config = {};
if (loggedUserJSON) {
    const token = JSON.parse(loggedUserJSON);
    config.headers = {
        token: token.tokenUser,
    };
}

const fetcher = async (url) => {
  const response = await fetch(url, config);
  
  if (!response.ok) {
    throw new Error('No se encontraron transacciones que coincidan con la búsqueda.');
  }
  
  return response.json();
};

export const useTransactions = (page = 1, limit = 10, search = "", orderBy, orderDirection) => {
  const url = `${import.meta.env.VITE_BASE_URL}/collaboration?page=${page}&limit=${limit}&search=${search}&orderBy=${orderBy}&orderDirection=${orderDirection}`;

  const { data, error } = useSWR(url, fetcher);

  console.log(data)

  return {
      transactions: data,
      isLoading: !error && !data,
      isError: error
  };
};

const Transactions = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [orderDirection, setOrderDirection] = useState('');
  const [orderBy, setOrderBy] = useState('');

  const { transactions, isLoading, isError } = useTransactions(page, 10, search, orderBy, orderDirection);

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

  const handlePageChange = (page) => {
    setPage(page);
  };

  const renderTransactions = () => {
    if (isLoading) return <div>Cargando...</div>;
    if (isError) return <div className='text-center'>No se encontraron transacciones que coincidan con la búsqueda <br /> o <br />Ocurrio un error al cargar las transacciones.</div>;

    return (
      <div className='container'>
        <Form className="d-flex align-items-end" role="search">
          <Form.Group className="me-3 mb-3">
            <Form.Control className="form-control my-2" placeholder='Buscar Usuario...' type='text' value={search} onChange={handleSearchChange}/>
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
            {transactions && transactions.collaborations && transactions.collaborations.map(transaction => (
              <tr key={transaction.transactionId}>
                <td>{transaction.transactionId}</td>
                <td>{transaction.name}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className='pagination-container'>
          <ActionsPagination
            currentPage={page}
            totalCount={transactions ? transactions.count : 0}
            limitPerPage={10}
            onPageChange={handlePageChange}
          />
        </div>
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