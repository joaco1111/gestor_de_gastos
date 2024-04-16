import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActions, getCategoryExpense } from '../../redux/actions';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { colors } from "./useColor";
import { Box, Typography, Paper } from "@mui/material";
import grafico from "../../assets/grafico.png"
import { calculateExpenseCategoryTotals } from './utils';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom'


const ExpensePieChart = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [expenseData, setExpenseData] = useState({});
    const actions = useSelector(state => state.actions);
    const categoriesExpense = useSelector(state => state.categorieExpense);

    const isLargeScreen = useMediaQuery('(min-width:1000px)');
    const isMediumScreen = useMediaQuery('(min-width:700px)');
  //   const isSmallScreen = useMediaQuery('(max-width:700px)');
  
    const chartWidth = isLargeScreen ? 380 : (isMediumScreen ? 300 : 200);
    const chartHeight = isLargeScreen ? 380 : (isMediumScreen ? 300 : 200);
  
    useEffect(() => {
      const fetchData = async () => {
        await Promise.all([
          dispatch(getCategoryExpense()),
          dispatch(fetchActions(1, 100))
        ]);
        setLoading(false);
        setDataLoaded(true);
      };
  
      fetchData();
    }, [dispatch]);
  
    useEffect(() => {
      if (dataLoaded && categoriesExpense && categoriesExpense.length > 0 && actions && actions.length > 0) {
        const totals = calculateExpenseCategoryTotals(actions, categoriesExpense);
        setExpenseData(totals);
      }
    }, [dataLoaded, actions, categoriesExpense]);
  
    if (loading) {
      return <div>Cargando...</div>;
    }

  return (
    <Box display="flex" justifyContent="center">
      <Link to= "/activity" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Paper elevation={3} sx={{ margin: 2, borderRadius: 6, padding: 2}}>
        <Typography variant='h6'>Gastos por categoría</Typography>
        {Object.keys(expenseData).length > 0 ? (
         <ResponsiveContainer width={chartWidth} height={chartHeight}>
          <PieChart width={400} height={400} responsive>
            <Pie
              data={Object.entries(expenseData).map(([label, value]) => ({ name: label, value }))}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
            >
              {Object.keys(expenseData).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          </ResponsiveContainer>

        ) : (
          <Box width={380} height={380} responsive sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <Box>
              <img src={grafico} style={{ height: 'auto' }}/>
            </Box>
            <Box>
              <Typography style={{ fontSize: '16px', color: '#757575', marginBottom: '8px', textAlign:"center" }}>
                No hay gastos
              </Typography>
            </Box>
           <Box>
              <Typography style={{ fontSize: '14px', color: '#757575', marginBottom: '8px' }}>
                Agrega tus gastos para ver tus gráficos.
              </Typography>
           </Box>
            
          </Box>
          
        )}
      </Paper>
        </Link>
    </Box>
  );
};

export default ExpensePieChart;
