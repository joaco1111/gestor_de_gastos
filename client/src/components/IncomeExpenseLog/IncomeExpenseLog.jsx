import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActions } from '../../redux/actions';
import { deleteAction } from '../../redux/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ActionsPagination from '../Pagination/ActionsPagination';
<<<<<<< HEAD
=======
import { BiTrash, BiDetail } from 'react-icons/bi';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5

const IncomeExpenseLog = () => {
  const dispatch = useDispatch();
  const actions = useSelector(state => state.actions);
<<<<<<< HEAD
  const { totalCount } = useSelector(state => state.actions);
  const [page, setPage] = useState(1);
  const limit = 10;
=======
  const totalCount = useSelector(state => state.totalCount);
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
  const loading = useSelector(state => state.loading);
  const [filters, setFilters] = useState({
    date: '',
    type: '',
    category: '',
  });

  useEffect(() => {
<<<<<<< HEAD
    dispatch(fetchActions(page, limit));
}, [dispatch, page, limit]);

  // Función para manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };
=======
    dispatch(fetchActions(currentPage, limitPerPage, filters));
  }, [dispatch, currentPage, filters]);

  // Función para manejar cambios en los filtros
  const handleFilterChange = (e) => {
  const { name, value } = e.target;
  setCurrentPage(1);
  setFilters(prevFilters => {
    if (name === 'type') {
      return {
        ...prevFilters,
        [name]: value,
        category: '',
      };
    } else {
      return {
        ...prevFilters,
        [name]: value
      };
    }
  });
};
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
<<<<<<< HEAD
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Agrega un cero al principio si el mes es menor que 10
    const day = String(date.getDate()).padStart(2, '0'); // Agrega un cero al principio si el día es menor que 10
=======
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate() + 1).padStart(2, '0');
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
    return `${year}-${month}-${day}`;
  };

  // Función para aplicar los filtros
  const applyFilters = (data, filters) => {
    // Si no hay ningún filtro aplicado, mostrar todos los datos
    if (Object.values(filters).every(value => value === '')) {
      return data;
    }
  
    // Aplica los filtros
    let filteredData = [...data]; // Copia los datos para no modificar el array original
    
    // Verificar si los filtros están definidos
    if (!filters) return filteredData;
  
    // Filtrar por día
    if (filters.date) {
      filteredData = filteredData.filter(action => {
        const actionDate = new Date(action.date);
        const filterDate = new Date(filters.date);
        return (
          actionDate.getFullYear() === filterDate.getFullYear() &&
          actionDate.getMonth() === filterDate.getMonth() &&
          actionDate.getDate() === filterDate.getDate()
        );
      });
    }
  
    // Filtrar por tipo
    if (filters.type) {
      filteredData = filteredData.filter(action => action.type === filters.type);
    }
  
    // Filtrar por categoría (gasto o ingreso)
    if (filters.category && filters.category !== 'Todos') {
      filteredData = filteredData.filter(action => {
        if (filters.type === 'gastos') {
          return action.categoryBill && action.categoryBill.name === filters.category;
        } else if (filters.type === 'ingresos') {
          return action.categoryIncome && action.categoryIncome.name === filters.category;
        }
        return true; // Si no se selecciona ninguna categoría, no se filtra
      });
    }
  
    // Retorna los datos filtrados
    return filteredData;
  };
<<<<<<< HEAD

  const filteredActions = applyFilters(actions, filters);

  const getCategoryOptions = (type) => {
    let categoryOptionsSet = new Set(['Todos']);
    actions.forEach(action => {
      if (type === 'gastos' && action.type === 'gastos' && action.categoryBill) {
        categoryOptionsSet.add(action.categoryBill.name);
      } else if (type === 'ingresos' && action.type === 'ingresos' && action.categoryIncome) {
        categoryOptionsSet.add(action.categoryIncome.name);
=======
  console.log(actions);
  console.log(filters);
  const filteredActions = applyFilters(actions, filters);
  console.log(filteredActions);
  const getCategoryOptions = (type) => {
    let categoryOptionsSet = new Set(['Todos']);
    actions.forEach(action => {
      if ((type === 'gastos' && action.type === 'gastos' && action.categoryBill) ||
          (type === 'ingresos' && action.type === 'ingresos' && action.categoryIncome)) {
        categoryOptionsSet.add(type === 'gastos' ? action.categoryBill.name : action.categoryIncome.name);
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
      }
    });
    return Array.from(categoryOptionsSet); // Convertir el conjunto a un array para ser iterado en el renderizado
  };

<<<<<<< HEAD
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleDelete = (id) => {
    // Llama a la acción deleteAction con el ID de la acción a eliminar
    dispatch(deleteAction(id));
=======
  const handleDelete = async (id) => {
    await dispatch(deleteAction(id));
    dispatch(fetchActions(currentPage, limitPerPage));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchActions(page, limitPerPage, filters));
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
  };

  return (
    <div className='container'>
      <h2>Tus Movimientos</h2>
      <div className='filters'>
        <label>
          Fecha:
          <input type="date" name="date" value={filters.date} onChange={handleFilterChange} />
        </label>
        <label>
          Tipo:
          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">Todos</option>
            <option value="ingresos">Ingresos</option>
            <option value="gastos">Gastos</option>
          </select>
        </label>
        {filters.type === 'gastos' && (
          <label>
            Categoría de Gastos:
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              {getCategoryOptions('gastos').map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </label>
        )}

        {filters.type === 'ingresos' && (
          <label>
            Categoría de Ingresos:
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              {getCategoryOptions('ingresos').map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </label>
        )}
      </div>
<<<<<<< HEAD
=======
      <div className='pagination-container'>
        <ActionsPagination
          currentPage={currentPage}
          totalCount={totalCount}
          limitPerPage={limitPerPage}
          onPageChange={handlePageChange}
        />
      </div>
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className='col-sm-12 col-md-12 col-lg-12 my-3'>
          {Array.isArray(filteredActions) && filteredActions.length > 0 ? (
            <table className='table table-dark table-striped'>
              <thead>
                <tr>
<<<<<<< HEAD
                  <th>ID</th>
=======
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
                  <th>Tipo</th>
                  <th>Fecha</th>
                  <th>Cantidad</th>
                  <th>Categoría de Gasto</th>
                  <th>Categoría de Ingreso</th>
                </tr>
              </thead>
              <tbody>
                {filteredActions.map(action => (
                  <tr key={action.id}>
<<<<<<< HEAD
                    <td>{action.id}</td>
=======
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
                    <td>{action.type}</td>
                    <td>{formatDate(action.date)}</td>
                    <td>{action.quantity}</td>
                    <td>{action.categoryBill ? action.categoryBill.name : '-'}</td>
                    <td>{action.categoryIncome ? action.categoryIncome.name : '-'}</td>
<<<<<<< HEAD
                    <td><button onClick={() => handleDelete(action.id)}>Eliminar</button></td>
=======
                    <td>
                      <Button title='Eliminar' variant="danger" onClick={() => handleDelete(action.id)}>
                        <BiTrash />
                      </Button>
                    </td>
                    <td>
                      <Link to={`/actions/${action.id}`}>
                      <Button title='Ver Detalle' variant="primary"><BiDetail /></Button>
                      </Link>
                    </td>
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay acciones que coincidan con los filtros seleccionados</p>
          )}
        </div>
      )}
<<<<<<< HEAD
      <div>
        <ActionsPagination totalCount={totalCount} limit={limit} onPageChange={handlePageChange} />
=======
      <div className='pagination-container'>
        <ActionsPagination
          currentPage={currentPage}
          totalCount={totalCount}
          limitPerPage={limitPerPage}
          onPageChange={handlePageChange}
        />
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default IncomeExpenseLog;
=======
export default IncomeExpenseLog;
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
