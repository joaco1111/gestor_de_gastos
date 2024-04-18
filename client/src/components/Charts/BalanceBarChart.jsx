import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActions } from '../../redux/actions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper } from "@mui/material"

const BalanceBarChart = ({ selectedMonth }) => {
    const dispatch = useDispatch();
    const allActions = useSelector(state => state.actions);
    const [filteredActions, setFilteredActions] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        dispatch(fetchActions(1, 100));
    }, [dispatch]);

    useEffect(() => {
        if (allActions.length > 0) {
            const filtered = allActions.filter(action => new Date(action.date).getMonth() === selectedMonth);
            setFilteredActions(filtered);
        }
    }, [allActions, selectedMonth]);

    useEffect(() => {
        const data = obtenerDatosDelMes();
        setChartData(data);
    }, [filteredActions]);

    const obtenerDatosDelMes = () => {
        const totalIncome = calculateTotalIncome(filteredActions);
        const totalExpenses = calculateTotalExpenses(filteredActions);
        const balance = totalIncome - totalExpenses;
    
        const monthIndex = selectedMonth + 1;
    
        return [{ month: monthIndex, Ingresos: totalIncome, Gastos: totalExpenses, balance }];
    };
    

    const calculateTotalIncome = (actions) => {
        if (!actions || actions.length === 0) return 0;

        return actions.reduce((total, action) => {
            if (action.type === 'ingresos') {
                return total + action.quantity;
            }
            return total;
        }, 0);
    };

    const calculateTotalExpenses = (actions) => {
        if (!actions || actions.length === 0) return 0;

        return actions.reduce((total, action) => {
            if (action.type === 'gastos') {
                return total + action.quantity;
            }
            return total;
        }, 0);
    };

    return (
        <>
        {/* <Paper elevation={3} sx={{ borderRadius: 5, margin: 2, padding: 4}}> */}
        <ResponsiveContainer width={400} height={400}>
            <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Ingresos" fill="green" />
                <Bar dataKey="Gastos" fill="red" />
                {/* <Bar dataKey="balance" fill="#ffc658" /> */}
            </BarChart>
        </ResponsiveContainer>
        {/* </Paper> */}
        </>
    );
};

export default BalanceBarChart;
