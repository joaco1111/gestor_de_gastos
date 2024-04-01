import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMetrics, fetchActions } from '../../redux/actions';
import Table from 'react-bootstrap/Table';
import { Doughnut } from 'react-chartjs-2';
import { Chart, DoughnutController, ArcElement, CategoryScale, Tooltip, Legend } from 'chart.js';
import './ActionsMetrics.css';

Chart.register(DoughnutController, ArcElement, CategoryScale, Tooltip, Legend);

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

    const data = {
        labels: ['Cantidad', 'Promedio Entre Fechas', 'Promedio', 'Total'],
        datasets: [
            {
                data: [metrics.count, metrics.promedioFechaDefinida, metrics.promedioType, metrics.total],
                backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0'],
                hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0']
            }
        ]
    };

    return (
        <div className='container'>
            <h2>Promedios</h2>
            {Array.isArray(actions) && actions.length > 0 ? (
                <div className="row">
                    <div className="col-md-6">
                        <form className="row g-3">
                            <div className="col-md-12">
                                <label htmlFor="type" className="form-label">Tipo:</label>
                                <select className="form-select" name="type" value={filters.type} onChange={handleChange}>
                                    <option value="">Selecciona un tipo</option>
                                    <option value="gastos">Gastos</option>
                                    <option value="ingresos">Ingresos</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="dateInitial" className="form-label">Fecha inicial:</label>
                                <input className="form-control" type="date" name="dateInitial" value={filters.dateInitial} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="dateLimit" className="form-label">Fecha límite:</label>
                                <input className="form-control" type="date" name="dateLimit" value={filters.dateLimit} onChange={handleChange} />
                            </div>
                        </form>
                        {metrics && filters.type !== '' && filters.type !== '' ? (
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
                        <div className="chart-container" style={{ maxWidth: '500px' }}>
                            <Doughnut data={data} />
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center">No hay movimientos que promediar</p>
            )}
        </div>
    );
};

export default ActionsMetrics;
