import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import { fetchActions } from '../../redux/actions';
import { Box, Typography, Paper } from "@mui/material";
import { MonetizationOn, TrendingUp, TrendingDown } from "@mui/icons-material";

const Balance = () => {
    const dispatch = useDispatch();
    const actions = useSelector(state => state.actions);
    const expenses = useSelector(state => state.expenses);
    // console.log(actions);
    // console.log([actions]);
    useEffect(() => {
        dispatch(fetchActions(1,100));
        
    }, [dispatch, expenses]);

    const totalIncome = useMemo(() => calculateTotalIncome(actions), [actions]);
    const totalExpenses = useMemo(() => calculateTotalExpenses(actions), [actions]);
    const balance = useMemo(() => calculateBalance(totalIncome, totalExpenses), [totalIncome, totalExpenses]);

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

    function calculateBalance(totalIncome, totalExpenses) {
        return totalIncome - totalExpenses;
    };

    return (
        <Box width="100%" display="flex" justifyContent="center">

            <Paper elevation={3} sx={{ p: 2, borderRadius: 3, display: 'flex', alignItems: 'center' }}>
                <MonetizationOn sx={{ fontSize: 30, color: 'gold', mr: 1, }} />
                <Typography variant='h6' sx={{ fontFamily: 'K2D, sans-serif', color: '(0, 0, 0, 0.54)' }}>
                    Saldo ${balance}
                </Typography>
            </Paper>

            <Link to="/detailsLog" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Paper elevation={3} sx={{ p: 2, borderRadius: 3, display: 'flex', alignItems: 'center', ml: 2 }}>
                    <TrendingUp sx={{ fontSize: 30, color: 'green', mr: 1 }} />
                    <Typography variant='h6' sx={{ fontFamily: 'K2D, sans-serif', fontSize: 20 }}>
                        Ingresos ${totalIncome}
                    </Typography>
                </Paper>
            </Link>

            <Link to="/detailsLog" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Paper elevation={3} sx={{ p: 2, borderRadius: 3, display: 'flex', alignItems: 'center', ml: 2 }}>
                    <TrendingDown sx={{ fontSize: 30, color: 'red', mr: 1 }} />
                    <Typography variant='h6' sx={{ fontFamily: 'K2D, sans-serif', fontSize: 20 }}>
                        Gastos ${totalExpenses}
                    </Typography>
                </Paper>
            </Link>

        </Box>
    );
};

export default Balance;
