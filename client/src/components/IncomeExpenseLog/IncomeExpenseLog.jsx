import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActions } from '../../redux/actions';
import { deleteAction } from '../../redux/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ActionsPagination from '../Pagination/ActionsPagination';
import { BiTrash, BiDetail } from 'react-icons/bi';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const IncomeExpenseLog = () => {
  const dispatch = useDispatch();
  const actions = useSelector(state => state.actions);
  const totalCount = useSelector(state => state.totalCount);
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const loading = useSelector(state => state.loading);
  const [filters, setFilters] = useState({
    date: '',
    type: '',
    category: '',
  });

  useEffect(() => {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate() + 1).padStart(2, '0');
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

  const filteredActions = applyFilters(actions, filters);

  const getCategoryOptions = (type) => {
    let categoryOptionsSet = new Set(['Todos']);
    actions.forEach(action => {
      if ((type === 'gastos' && action.type === 'gastos' && action.categoryBill) ||
          (type === 'ingresos' && action.type === 'ingresos' && action.categoryIncome)) {
        categoryOptionsSet.add(type === 'gastos' ? action.categoryBill.name : action.categoryIncome.name);
      }
    });
    return Array.from(categoryOptionsSet); // Convertir el conjunto a un array para ser iterado en el renderizado
  };

  const handleDelete = async (id) => {
    await dispatch(deleteAction(id));
    dispatch(fetchActions(currentPage, limitPerPage));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchActions(page, limitPerPage, filters));
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
      <div className='pagination-container'>
        <ActionsPagination
          currentPage={currentPage}
          totalCount={totalCount}
          limitPerPage={limitPerPage}
          onPageChange={handlePageChange}
        />
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className='col-sm-12 col-md-12 col-lg-12 my-3'>
          {Array.isArray(filteredActions) && filteredActions.length > 0 ? (
            <table className='table table-dark table-striped'>
              <thead>
                <tr>
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
                    <td>{action.type}</td>
                    <td>{formatDate(action.date)}</td>
                    <td>{action.quantity}</td>
                    <td>{action.categoryBill ? action.categoryBill.name : '-'}</td>
                    <td>{action.categoryIncome ? action.categoryIncome.name : '-'}</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay acciones que coincidan con los filtros seleccionados</p>
          )}
        </div>
      )}
      <div className='pagination-container'>
        <ActionsPagination
          currentPage={currentPage}
          totalCount={totalCount}
          limitPerPage={limitPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default IncomeExpenseLog;