import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Typography, Button, ButtonGroup, Box, Grid } from '@mui/material';
import { fetchActions } from '../../redux/actions';
import NavBar from '../../components/NavBar/NavBar';

const DetailsAccount = () => {
  const dispatch = useDispatch();
  const actions = useSelector(state => state.actions);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('efectivo/debito');
  const [creditCardDetails, setCreditCardDetails] = useState(null);

  useEffect(() => {
    dispatch(fetchActions(1,100));
  }, [dispatch]);

  useEffect(() => {
    if (actions.length > 0 && selectedPaymentMethod === 'tarjeta de crédito') {
      const details = getCreditCardDetails(actions);
      setCreditCardDetails(details);
    } else {
      setCreditCardDetails(null);
    }
  }, [actions, selectedPaymentMethod]);

  const getCreditCardDetails = (actions) => {
    const creditCardActions = actions.filter(action => action.paymentMethod === 'tarjeta de crédito');
    const creditCards = {};
    
    creditCardActions.forEach(action => {
      const { creditCardId, cuotas } = action;
      const { name } = action.creditCard;
      
      if (!creditCards[creditCardId]) {
        creditCards[creditCardId] = { name, installments: [] };
      }
      
      if (cuotas !== null && cuotas !== undefined) {
        creditCards[creditCardId].installments.push(parseInt(cuotas, 10));
      }
    });
    
    return creditCards;
  };

  const calculateBalance = () => {
    if (!actions || actions.length === 0) return 0;

    const filteredActions = actions.filter(action => action.paymentMethod === selectedPaymentMethod);
    let balance = 0;
    
    filteredActions.forEach(action => {
      if (action.type === 'ingresos') {
        balance += action.quantity;
      } else if (action.type === 'gastos') {
        balance -= action.quantity;
      }
    });

    return balance;
  };

  return (
    <>
      <NavBar/>
      <Box
    
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box m="50px">
              <Typography variant="h4" fontWeight="bold" sx={{ m: "0 0 5px 0" }}>
                Cuentas
              </Typography>
              <Typography variant="h5">
                Visualiza los detalles
              </Typography>
            </Box>
          </Grid>
        
        <Paper elevation={3} sx={{ margin: 2, borderRadius: 6, padding: 2, alignContent:"center", justifyContent:"center" }}>
        
          <Grid item xs={12}>
            <ButtonGroup>
              <Button onClick={() => setSelectedPaymentMethod('efectivo/debito')} variant={selectedPaymentMethod === 'efectivo/debito' ? "contained" : "outlined"}>Efectivo/Débito</Button>
              <Button onClick={() => setSelectedPaymentMethod('transferencia')} variant={selectedPaymentMethod === 'transferencia' ? "contained" : "outlined"}>Transferencia</Button>
              <Button onClick={() => setSelectedPaymentMethod('tarjeta de crédito')} variant={selectedPaymentMethod === 'tarjeta de crédito' ? "contained" : "outlined"}>Tarjeta de Crédito</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            {selectedPaymentMethod && selectedPaymentMethod !== 'tarjeta de crédito' && (
              <Box>
                {/* <Typography variant="h5">{selectedPaymentMethod}</Typography> */}
                <Typography variant="body1">Saldo Actual: {calculateBalance()}</Typography>
                <Typography variant="body1">Total Gastos: {actions.filter(action => action.paymentMethod === selectedPaymentMethod && action.type === 'gastos').length}</Typography>
                <Typography variant="body1">Total Ingresos: {actions.filter(action => action.paymentMethod === selectedPaymentMethod && action.type === 'ingresos').length}</Typography>
              </Box>
            )}
            {selectedPaymentMethod === 'tarjeta de crédito' && creditCardDetails && (
              <Box>
                {/* <Typography variant="h5">Tarjeta de Crédito</Typography> */}
                <Typography variant="body1">Saldo Actual: {calculateBalance()}</Typography>
                <Typography variant="body1">Total Gastos: {actions.filter(action => action.paymentMethod === selectedPaymentMethod && action.type === 'gastos').length}</Typography>
                <Typography variant="body1">Total Ingresos: {actions.filter(action => action.paymentMethod === selectedPaymentMethod && action.type === 'ingresos').length}</Typography>
                {Object.entries(creditCardDetails).map(([cardId, cardInfo]) => (
                  <div key={cardId}>
                    <Typography variant="body1">Nombre de la tarjeta: {cardInfo.name}</Typography>
                    {cardInfo.installments.map((installment, index) => (
                      <Typography key={index} variant="body1">{index + 1}: {installment}</Typography>
                    ))}
                  </div>
                ))}
              </Box>
            )}
          </Grid>
        </Paper>

        </Grid>
      </Box>
    </>
  );
};

export default DetailsAccount;
