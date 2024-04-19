import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActions, deleteAction } from '../../redux/actions';
import ActionsPagination from '../Pagination/ActionsPagination';
import { BiTrash, BiDetail } from 'react-icons/bi';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import jsPDF from 'jspdf';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './IncomeExpenseLog.css'

const IncomeExpenseLog = () => {
  const tableRef = useRef(null);
  const dispatch = useDispatch();
  const actions = useSelector(state => state.actions);
  const totalCount = useSelector(state => state.totalCount);
  const [currentPage, setCurrentPage] = useState(1); // Inicializar currentPage en 1
  const limitPerPage = 5;
  const loading = useSelector(state => state.loading);
  const [filters, setFilters] = useState({
    date: '',
    type: '',
    category: '',
  });
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [orderBy, setOrderBy] = useState(''); // Cambiado a valor vacío para seleccionar por defecto 'Seleccionar' en el select de ordenar por

    useEffect(() => {
      dispatch(fetchActions(currentPage, limitPerPage, filters, orderDirection, orderBy)); // Incluir el nuevo estado 'orderBy' en la llamada a fetchActions
    }, [dispatch, currentPage, filters, orderDirection, orderBy]);
    
  
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
  
    // Función para manejar cambios en la ordenación
    const handleOrderChange = (e) => {
        const { value } = e.target;
        setOrderBy(value); // Actualizar el estado 'orderBy' con el valor seleccionado
    };

    const handleOrderDirectionChange = (e) => {
      const { value } = e.target;
      setOrderDirection(value);
    };

  // Función para aplicar los filtros
  const applyFilters = (data, filters) => {
  if (!Array.isArray(data)) {
    return [];
  }
  
  // Si no hay ningún filtro aplicado, mostrar todos los datos
  if (Object.values(filters).every(value => value === '')) {
    return data.filter(action => !action.pending); // Filtrar los gastos con pending en false
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

  // Filtrar los gastos con pending en false
  if (filters.type === 'gastos') {
    filteredData = filteredData.filter(action => !action.pending);
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

  //funcion para armar el pdf
  const printTable = () => {
    const doc = new jsPDF();
  
    // Agrega los encabezados de la tabla
    doc.text('REPORTE DE GESTOR DE GASTOS', 10, 20);
    doc.text('Tipo', 10, 40);
    doc.text('Fecha', 40, 40);
    doc.text('Cantidad', 80, 40);
    doc.text('Categoría', 120, 40);
  
    // Agrega las filas de la tabla
    tableRef.current.querySelectorAll('tbody tr').forEach((row, index) => {
      const cells = row.querySelectorAll('td');
      doc.text(cells[0].innerText, 10, 50 + index * 10);
      doc.text(cells[1].innerText, 40, 50 + index * 10);
      doc.text(cells[2].innerText, 80, 50 + index * 10);
      doc.text(cells[3].innerText, 120, 50 + index * 10);
      
    });
    const img = new Image();
    img.src = 'https://res.cloudinary.com/dztu2vfru/image/upload/v1713236438/h0nf7w7kte35aghq6t8m.png';
    doc.addImage(img, 'PNG', 160, 5, 30, 20);
  
    // Guarda el PDF en un archivo
    doc.save('ReporteGDG.pdf');
  };

  return (
    
    <div className='container'>
      <h2>Tus Movimientos</h2>

      <div className="row " >
        <div className="col-md-3 mb-3">
          <label htmlFor="date" className="form-label">Fecha:</label>
          <input className="form-control" type="date" id="date" name="date" value={filters.date} onChange={handleFilterChange} />
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="orderBy" className="form-label">Ordenar por:</label>
          <select className="form-select" id="orderBy" name="orderBy" value={orderBy} onChange={handleOrderChange}>
            <option value="">Seleccionar</option>
            <option value="date">Fecha</option>
            <option value="quantity">Cantidad</option>
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="orderDirection" className="form-label">Ordenar:</label>
          <select className="form-select" id="orderDirection" name="orderDirection" value={orderDirection} onChange={handleOrderDirectionChange}>
            <option value="DESC">Descendente</option>
            <option value="ASC">Ascendente</option>
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="type" className="form-label">Tipo:</label>
          <select className="form-select" id="type" name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">Todos</option>
            <option value="ingresos">Ingresos</option>
            <option value="gastos">Gastos</option>
          </select>
        </div>
        {filters.type === 'gastos' && (
          <div className="col-md-3 mb-3">
            <label htmlFor="category" className="form-label">Categoría:</label>
            <select className="form-select" id="category" name="category" value={filters.category} onChange={handleFilterChange}>
              {getCategoryOptions('gastos').map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        )}
        {filters.type === 'ingresos' && (
          <div className="col-md-3 mb-3">
            <label htmlFor="category" className="form-label">Categoría:</label>
            <select className="form-select" id="category" name="category" value={filters.category} onChange={handleFilterChange}>
              {getCategoryOptions('ingresos').map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : (
        <div className='col-sm-12 col-md-12 col-lg-12 my-3' style={{ paddingTop: '20px' }}>
          {Array.isArray(filteredActions) && filteredActions.length > 0 ? (
            <Table striped bordered hover ref={tableRef} id='actionsTable'> {/* Utilizar componente de tabla de Bootstrap */}
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Fecha</th>
                  <th>Cantidad</th>
                  <th>Categoría</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredActions.map(action => (
                  <tr key={action.id}>
                    <td>{action.type}</td>
                    <td>{action.date}</td>
                    <td>{action.quantity}</td>
                    <td>{action.categoryBill ? action.categoryBill.name : ''} {action.categoryIncome ? action.categoryIncome.name : ''}</td>
                    <td>
                      <Button title='Eliminar' variant="danger" onClick={() => handleDelete(action.id)}>
                        <BiTrash />
                      </Button>
                      <span style={{ marginRight: '8px' }}></span>
                      <Link to={`/actions/${action.id}`}>
                      <Button title='Ver Detalle' variant="primary"><BiDetail /></Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
              <div className="button-container">
                <Button onClick={() => printTable(tableRef, actions)}>Descargar PDF</Button>
                <ReactHTMLTableToExcel
                  id="botonExportarExcel"
                  className="btn btn-success"
                  table="actionsTable"
                  filename="ReporteGDG"
                  sheet="Reporte"
                  buttonText="Descargar Excel"
                />
              </div>
            </Table>
          ) : (
            <Link to={`/home`}><Button className="action-detail-button d-block" variant="primary" size="sm" >Agrega Tus Movimientos</Button></Link>
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