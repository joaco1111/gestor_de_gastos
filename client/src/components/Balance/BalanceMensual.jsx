import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Paper, LinearProgress, Divider } from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import { fetchActions } from '../../redux/actions';
import { Link } from 'react-router-dom';

const BalanceMensual = ({ selectedMonth }) => {
    const dispatch = useDispatch();
    const allActions = useSelector(state => state.actions);
    const [filteredActions, setFilteredActions] = useState([]);

    useEffect(() => {
        dispatch(fetchActions(1, 100));
    }, [dispatch]);

    useEffect(() => {
        if (allActions.length > 0) {
            const filtered = allActions.filter(action => new Date(action.date).getMonth() === selectedMonth);
            setFilteredActions(filtered);
        }
    }, [allActions, selectedMonth]);

    const totalIncome = calculateTotalIncome(filteredActions);
    const totalExpenses = calculateTotalExpenses(filteredActions);
    const balance = totalIncome - totalExpenses;

    const incomePercentage = (totalIncome / (totalIncome + totalExpenses)) * 100;
    const expensePercentage = (totalExpenses / (totalIncome + totalExpenses)) * 100;

    function calculateTotalIncome(actions) {
        if (!actions || actions.length === 0) return 0;

        return actions.reduce((total, action) => {
            if (action.type === 'ingresos') {
                return total + action.quantity;
            }
            return total;
        }, 0);
    };

    function calculateTotalExpenses(actions) {
        if (!actions || actions.length === 0) return 0;

        return actions.reduce((total, action) => {
            if (action.type === 'gastos') {
                return total + action.quantity;
            }
            return total;
        }, 0);
    };

    return (
        <Link to="/balanz" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box width="100%" display="flex" flexDirection="column" alignItems="center">
                <Paper elevation={3} sx={{ borderRadius: 5, margin: 2, padding: 4, width: '80%', maxWidth: 450 }}>
                    <Typography variant='h5' justifyContent="center">Balance Mensual</Typography>

                    <Box display="flex" alignItems="center">
                        <TrendingUp sx={{ fontSize: 30, color: 'green', mr: 1 }} />
                        <Typography variant='h6' sx={{ color: "green", fontFamily: 'K2D, sans-serif', fontSize: 20 }}>
                            Ingresos ${totalIncome}
                        </Typography>
                    </Box>
                    {totalIncome > 0 && (
                        <LinearProgress variant="determinate" value={incomePercentage} color="success" orientation="vertical" sx={{ height: 10, borderRadius: 5 }} />
                    )}

                    <Box display="flex" alignItems="center">
                        <TrendingDown sx={{ fontSize: 30, color: 'red', mr: 1 }} />
                        <Typography variant='h6' sx={{ color: "red", fontFamily: 'K2D, sans-serif', fontSize: 20 }}>
                            Gastos ${totalExpenses}
                        </Typography>
                    </Box>

                    {totalExpenses > 0 && (
                        <LinearProgress variant="determinate" value={expensePercentage} color="error" orientation="vertical" sx={{ height: 10, borderRadius: 5 }} />
                    )}
                    
                    <Divider variant="fullWidth" sx={{ borderColor: 'rgba(0, 0, 0, 1)', my: 2 }} />
                    <Box>
                        <Typography variant='h6' sx={{ fontFamily: 'K2D, sans-serif', color: '(0, 0, 0, 0.54)' }}>
                            Balance ${balance}
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Link>
    );
};

export default BalanceMensual;
