import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActions, getCategoryExpense, getCategoryIncome } from '../../redux/actions';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { colors, incomeColors } from "./useColor";
import { Box, Typography, Paper } from "@mui/material";
import grafico from "../../assets/grafico.png"

const PieChartComponent = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  const actions = useSelector(state => state.actions);
  const categoriesIncome = useSelector(state => state.categorieIncome);
  const categoriesExpense = useSelector(state => state.categorieExpense);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(getCategoryExpense()),
        dispatch(getCategoryIncome()),
        dispatch(fetchActions(1,100))
      ]);
      setLoading(false);
      setDataLoaded(true);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (dataLoaded && categoriesExpense && categoriesExpense.length > 0 && categoriesIncome && categoriesIncome.length > 0 && actions && actions.length > 0) {
      const expenseCategoryTotals = {};
      const incomeCategoryTotals = {};

      actions.forEach(action => {
        if (action.type === 'gastos' && action.idCategoryBills !== null) {
          const categoryName = getCategoryName(action.idCategoryBills, categoriesExpense);
          expenseCategoryTotals[categoryName] = (expenseCategoryTotals[categoryName] || 0) + action.quantity;
        } else if (action.type === 'ingresos' && action.idCategoryIncome !== null) {
          const categoryName = getCategoryName(action.idCategoryIncome, categoriesIncome);
          incomeCategoryTotals[categoryName] = (incomeCategoryTotals[categoryName] || 0) + action.quantity;
        }
      });

      setExpenseData(expenseCategoryTotals);
      setIncomeData(incomeCategoryTotals);
    }
  }, [dataLoaded, actions, categoriesExpense, categoriesIncome]);

  const getCategoryName = (categoryId, categories) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Desconocido';
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Box display="flex" justifyContent="center">
      <Paper elevation={8} sx={{ margin: 2, borderRadius: 6, padding: 2 }}>
        <Typography variant='h6'>Gastos por categoría</Typography>
        {Object.keys(expenseData).length > 0 ? (
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
      <Paper elevation={3} sx={{ margin: 2, borderRadius: 6, padding: 2, maxWidth: 450 }}>
        <Typography variant='h6'>Ingresos por categoría</Typography>
        {Object.keys(incomeData).length > 0 ? (
          <PieChart width={400} height={400} responsive>
            <Pie
              data={Object.entries(incomeData).map(([label, value]) => ({ name: label, value }))}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
            >
              {Object.keys(incomeData).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={incomeColors[index % incomeColors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <Box width={380} height={380} responsive sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <Box>
              <img src={grafico} style={{ height: 'auto' }}/>
            </Box>
            
              <Typography style={{ fontSize: '16px', color: '#757575', marginBottom: '8px', textAlign:"center" }}>
                No hay ingresos
              </Typography>
            

              <Typography style={{ fontSize: '14px', color: '#757575', marginBottom: '8px' }}>
                Agrega tus ganancias para ver tus gráficos.
              </Typography>
           
            
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default PieChartComponent;
