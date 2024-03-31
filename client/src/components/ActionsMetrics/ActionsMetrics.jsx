import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMetrics, fetchActions } from '../../redux/actions';
import Table from 'react-bootstrap/Table';
import { Pie } from 'react-chartjs-2';
import './ActionsMetrics.css';

const ActionsMetrics = () => {
    const actions = useSelector(state => state.actions);
    const [filters, setFilters] = useState({
        type: '',
        dateInitial: '',
        dateLimit: ''
    });

    const dispatch = useDispatch();

    const metrics = useSelector(state => state.metrics);
    const error = useSelector(state => state.error);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
        if (name === 'type' && value.trim() !== '') { // Verifica si el valor no está vacío
            dispatch(fetchMetrics(value, '', ''));
        }
    };

    useEffect(() => {
        const { type, dateInitial, dateLimit } = filters;
        if (type && dateInitial && dateLimit) {
            dispatch(fetchMetrics(type, dateInitial, dateLimit));
        }
    }, [filters, dispatch]);

    useEffect(() => {
        dispatch(fetchActions());
    }, [dispatch]);

    const pieData = {
        labels: ['Cantidad', 'Promedio Entre Fechas', 'Promedio', 'Total'],
        datasets: [
            {
                data: [
                    metrics?.count || 0,
                    metrics?.promedioFechaDefinida || 0,
                    metrics?.promedioType || 0,
                    metrics?.total || 0
                ],
                backgroundColor: ['gold', 'yellowgreen', 'lightcoral', 'lightskyblue']
            }
        ]
    };

    const pieOptions = {
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    return (
        <div className='container'>
            <h2>Promedios</h2>
            <form className="row g-3">
                <div className="col-md-4">
                    <label htmlFor="type" className="form-label">Tipo:</label>
                    <select className="form-select" name="type" value={filters.type} onChange={handleChange}>
                        <option value="">Selecciona un tipo</option>
                        <option value="gastos">Gastos</option>
                        <option value="ingresos">Ingresos</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="dateInitial" className="form-label">Fecha inicial:</label>
                    <input className="form-control" type="date" name="dateInitial" value={filters.dateInitial} onChange={handleChange} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="dateLimit" className="form-label">Fecha límite:</label>
                    <input className="form-control" type="date" name="dateLimit" value={filters.dateLimit} onChange={handleChange} />
                </div>
            </form>
            <div className="row">
                <div className="col-md-6">
                    {Array.isArray(actions) && actions.length > 0 ? (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Cantidad</th>
                                    <th>Promedio Entre Fechas</th>
                                    <th>Promedio</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{metrics.type}</td>
                                    <td>{metrics.count}</td>
                                    <td>{metrics.promedioFechaDefinida}</td>
                                    <td>{metrics.promedioType}</td>
                                    <td>{metrics.total}</td>
                                </tr>
                            </tbody>
                        </Table>
                    ) : (
                        <p className="text-center">Selecciona un tipo</p>
                    )}
                </div>
                <div className="col-md-6">
                    <div className="chart-container" style={{ maxWidth: '800px' }}>
                        <Pie data={pieData} options={pieOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActionsMetrics;
