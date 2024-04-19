import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Box, Typography, Paper, Grid, ButtonGroup, Button, List, ListItem, ListItemText } from "@mui/material";
import ExpensePieChart from '../../components/Charts/ExpensePieChart';
import IncomePieChart from '../../components/Charts/IncomePieChart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActions, getCategoryExpense, getCategoryIncome } from '../../redux/actions';
import { calculateExpenseCategoryTotals, calculateIncomeCategoryTotals } from '../../components/Charts/utils';

const Activity = () => {
  const [showIncome, setShowIncome] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const dispatch = useDispatch();
  const actions = useSelector(state => state.actions);
  const categoriesExpense = useSelector(state => state.categorieExpense);
  const categoriesIncome = useSelector(state => state.categorieIncome);

  useEffect(() => {
    dispatch(getCategoryExpense());
    dispatch(getCategoryIncome());
    dispatch(fetchActions(1, 100));
  }, [dispatch]);

  useEffect(() => {
    if (actions && categoriesExpense && categoriesIncome && actions.length > 0 && categoriesExpense.length > 0 && categoriesIncome.length > 0) {
      let total = 0; // Define la variable total y establece su valor en 0

      if (showIncome) {
        const incomeTotals = calculateIncomeCategoryTotals(actions, categoriesIncome);
        setCategoryData(Object.entries(incomeTotals).map(([categoryName, total]) => ({ categoryName, total })));
        total = Object.values(incomeTotals).reduce((acc, val) => acc + val, 0); // Calcula el total de ingresos
      } else {
        const expenseTotals = calculateExpenseCategoryTotals(actions, categoriesExpense);
        setCategoryData(Object.entries(expenseTotals).map(([categoryName, total]) => ({ categoryName, total })));
        total = Object.values(expenseTotals).reduce((acc, val) => acc + val, 0); // Calcula el total de gastos
      }

      setCategoryData(prevData => prevData.map(category => ({
        ...category,
        percentage: total !== 0 ? (category.total / total) * 100 : 0 // Calcula el porcentaje
      })));
    }
  }, [actions, categoriesExpense, categoriesIncome, showIncome]);

  const handleShowIncome = () => {
    setShowIncome(true);
  };

  const handleShowExpense = () => {
    setShowIncome(false);
  };

  return (
    <div className="content-container" style={{ position: 'relative', top: '100px' }}>
      <NavBar />
      <Typography variant="h4" fontWeight="bold" sx={{ m: "0 0 5px 0" }}>Actividad</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Paper elevation={3} sx={{ borderRadius: 6, padding: 2, maxWidth: '700px', width: '100%' , backgroundColor: '#d3e1fc'}}>
          <Box m="50px">
            <Typography variant="h5">
              Visualiza tus ingresos y gastos
            </Typography>
          </Box>

          <ButtonGroup>
            <Button onClick={handleShowIncome} variant={showIncome ? "contained" : "outlined"}>Ingresos</Button>
            <Button onClick={handleShowExpense} variant={!showIncome ? "contained" : "outlined"}>Gastos</Button>
          </ButtonGroup>

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={7}>
              <Box p={3}>
                {showIncome ? <IncomePieChart actions={actions} /> : <ExpensePieChart actions={actions} />}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box p={3}>
                <List>
                  {categoryData
                    .sort((a, b) => a.categoryName.localeCompare(b.categoryName))
                    .map((category, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={category.categoryName.charAt(0).toUpperCase() + category.categoryName.slice(1)}
                          secondary={`$ ${category.total} ( ${category.percentage.toFixed(2)}%)`}
                        />
                      </ListItem>
                    ))}
                </List>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};

export default Activity;
