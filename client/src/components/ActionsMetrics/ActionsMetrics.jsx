import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMetrics, fetchActions } from '../../redux/actions';
import Table from 'react-bootstrap/Table';
import c3 from 'c3';
import 'c3/c3.css';
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
    const chartRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    useEffect(() => {
        if (filters.type.trim() !== '') {
            console.log('Fetching metrics with filters:', filters);
            dispatch(fetchMetrics(filters.type, filters.dateInitial, filters.dateLimit));
        }
    }, [filters, dispatch]);

    useEffect(() => {
        dispatch(fetchActions());
    }, [dispatch]);

    useEffect(() => {
        const { type } = filters;
        if (type && type.trim() !== '' && metrics && metrics.count > 0) {
            let columnsData = [
                ['Cantidad', metrics.count],
                ['Promedio', metrics.promedioType],
                ['Total', metrics.total]
            ];
            if (metrics.promedioFechaDefinida) {
                columnsData.push(['Promedio Entre Fechas', metrics.promedioFechaDefinida]);
            }
            const chart = c3.generate({
                bindto: chartRef.current,
                data: {
                    columns: columnsData,
                    type: 'donut'
                },
                donut: {
                    title: "Promedios"
                }
            });
        } else {
            // Si no hay datos disponibles o el tipo está en la opción predeterminada, oculta el gráfico
            if (chartRef.current) {
                chartRef.current.innerHTML = ""; // Eliminar el contenido del gráfico
            }
        }
    }, [filters, dispatch, metrics]);    

    return (
        <div className='container'>
            <h2>Promedios</h2>
            <div className="row">
                {actions.length > 0 && (
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
                        {filters.type.trim() !== '' && metrics && metrics.count > 0 ? (
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
                            <p className="text-center">{filters.type.trim() === '' ? 'Selecciona un tipo' : 'No hay acciones disponibles de este Tipo'}</p>
                        )}
                    </div>
                )}
                <div className="col-md-6">
                    <div ref={chartRef}></div>
                </div>
            </div>
        </div>
    );
};

export default ActionsMetrics;