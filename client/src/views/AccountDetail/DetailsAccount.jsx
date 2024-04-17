import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Typography, Button, ButtonGroup, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { fetchActions } from '../../redux/actions';
import NavBar from '../../components/NavBar/NavBar';
import { MonetizationOn, TrendingUp, TrendingDown } from "@mui/icons-material";

const DetailsAccount = () => {
  const dispatch = useDispatch();
  const actions = useSelector(state => state.actions);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('efectivo/debito');
  const [creditCardDetails, setCreditCardDetails] = useState(null);

  useEffect(() => {
    dispatch(fetchActions(1, 100));
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
        if (action.type === 'ingresos') {
          creditCards[creditCardId].installments.push({ installment: parseInt(cuotas, 10), amount: action.quantity });
        } else if (action.type === 'gastos') {
          creditCards[creditCardId].installments.push({ installment: parseInt(cuotas, 10), amount: -action.quantity });
        }
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
      <NavBar />
      <Box>
        <Box m="100px" textAlign="left">
          <Typography variant="h4" fontWeight="bold" sx={{ m: "0 0 5px 0" }}>
            Cuentas
          </Typography>
          <Typography variant="h5">
            Visualiza los detalles
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ margin: 2, borderRadius: 6, padding: 2 }}>

          <ButtonGroup>
            <Button onClick={() => setSelectedPaymentMethod('efectivo/debito')} variant={selectedPaymentMethod === 'efectivo/debito' ? "contained" : "outlined"}>Efectivo/Débito</Button>
            <Button onClick={() => setSelectedPaymentMethod('transferencia')} variant={selectedPaymentMethod === 'transferencia' ? "contained" : "outlined"}>Transferencia</Button>
            <Button onClick={() => setSelectedPaymentMethod('tarjeta de crédito')} variant={selectedPaymentMethod === 'tarjeta de crédito' ? "contained" : "outlined"}>Tarjeta de Crédito</Button>
          </ButtonGroup>

          <Box my={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {selectedPaymentMethod && selectedPaymentMethod !== 'tarjeta de crédito' && (
                  <Box justifyContent="center" alignItems="center" mb={3}>
                    <Typography variant="h6" sx={{ fontFamily: 'K2D, sans-serif', fontSize: 20 }}> <MonetizationOn sx={{ fontSize: 30, color: 'gold', mr: 1, }} />Saldo Actual: ${calculateBalance()}</Typography>
                    <Typography variant="h6" sx={{ fontFamily: 'K2D, sans-serif', fontSize: 20 }}><TrendingDown sx={{ fontSize: 30, color: 'red', mr: 1 }} /> Gastos: {actions.filter(action => action.paymentMethod === selectedPaymentMethod && action.type === 'gastos').length}</Typography>
                    <Typography variant="h6" sx={{ fontFamily: 'K2D, sans-serif', fontSize: 20 }}><TrendingUp sx={{ fontSize: 30, color: 'green', mr: 1 }} /> Ingresos: {actions.filter(action => action.paymentMethod === selectedPaymentMethod && action.type === 'ingresos').length}</Typography>
                  </Box>
                )}
                {selectedPaymentMethod === 'tarjeta de crédito' && creditCardDetails && (
                  <Box>
                    <Typography variant="h6" sx={{ fontFamily: 'K2D, sans-serif', fontSize: 20 }}><MonetizationOn sx={{ fontSize: 30, color: 'gold', mr: 1, }} />Saldo Actual: {calculateBalance()}</Typography>
                    <Typography variant="h6" sx={{ fontFamily: 'K2D, sans-serif', fontSize: 20 }}><TrendingDown sx={{ fontSize: 30, color: 'red', mr: 1 }} /> Gastos: {actions.filter(action => action.paymentMethod === selectedPaymentMethod && action.type === 'gastos').length}</Typography>
                    <Typography variant="h6" sx={{ fontFamily: 'K2D, sans-serif', fontSize: 20 }}><TrendingUp sx={{ fontSize: 30, color: 'green', mr: 1 }} />Ingresos: {actions.filter(action => action.paymentMethod === selectedPaymentMethod && action.type === 'ingresos').length}</Typography>

                    {Object.entries(creditCardDetails).map(([cardId, cardInfo]) => (
                      <Box key={cardId} mt={3}>
                        <Typography variant="h6" sx={{ fontFamily: 'K2D, sans-serif', fontSize: 20 }}>Tarjeta {cardInfo.name}</Typography>
                        <TableContainer component={Paper} sx={{ marginTop: 2, maxHeight: '300px', overflowY: 'auto' }}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{fontWeight:"bold", textAlign:"center", borderRight: "1px solid rgba(224, 224, 224, 1)"}}>Monto</TableCell>
                                <TableCell sx={{fontWeight:"bold", textAlign:"center", borderRight: "1px solid rgba(224, 224, 224, 1)"}}>Tipo</TableCell>
                                <TableCell sx={{fontWeight:"bold", textAlign:"center"}}>Cuotas</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {cardInfo.installments.map((installment, index) => (
                                <TableRow key={index}>
                                  <TableCell sx={{ textAlign:"center", borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{installment.amount}</TableCell>
                                  <TableCell sx={{ textAlign:"center", borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{installment.amount > 0 ? 'Ingreso' : 'Gasto'}</TableCell>
                                  <TableCell sx={{ textAlign:"center"}}>{installment.installment} cuotas</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    ))}
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </Paper>

      </Box>
    </>
  );
};

export default DetailsAccount;
