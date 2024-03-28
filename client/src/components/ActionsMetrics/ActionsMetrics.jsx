import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMetrics, fetchActions } from '../../redux/actions';
import Table from 'react-bootstrap/Table';
import { Pie } from 'react-chartjs-2';
import './ActionsMetrics.css';

const ActionsMetrics = () => {
    const [filters, setFilters] = useState({
        type: '',
        dateInitial: '',
        dateLimit: ''
    });

    const dispatch = useDispatch();

    const metrics = useSelector(state => state.metrics);
    const error = useSelector(state => state.error);
    const actions = useSelector(state => state.actions);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
        if (name === 'type') {
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
        dispatch(fetchActions()); // Esto obtiene todas las acciones cuando el componente se monta
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
            <form>
                <label>
                    Tipo: <br />
                    <select className='filter-select' name="type" value={filters.type} onChange={handleChange}>
                        <option value="">Selecciona un tipo</option>
                        <option value="gastos">Gastos</option>
                        <option value="ingresos">Ingresos</option>
                    </select>
                </label>
                <label>
                    Fecha inicial: <br />
                    <input className='filter-select' type="date" name="dateInitial" value={filters.dateInitial} onChange={handleChange} />
                </label>
                <label>
                    Fecha límite: <br />
                    <input className='filter-select' type="date" name="dateLimit" value={filters.dateLimit} onChange={handleChange} />
                </label>
            </form>
            {metrics && (
                <div>
                    <h2>Métricas</h2>
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
                    <div>
                        <div className="chart-container" style={{ maxWidth: '800px' }}>
                            <Pie data={pieData} options={pieOptions} />
                        </div>
                    </div>
                </div>
            )}
            {error && (
                <div>
                    <h2>Error</h2>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default ActionsMetrics;