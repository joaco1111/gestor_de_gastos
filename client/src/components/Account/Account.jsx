import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Typography } from '@mui/material';
import { fetchActions } from '../../redux/actions';
import { getAccountSummary } from './accountUtils';
import { Link } from 'react-router-dom';

const Account = () => {
  const dispatch = useDispatch();
  const actions = useSelector((state) => state.actions);

  useEffect(() => {
    dispatch(fetchActions());
  }, [dispatch]);

  const accountSummary = getAccountSummary(actions);

  return (
    <>
    <Link to="/account" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 3, alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Cuentas
        </Typography>
        <Typography variant="body1">
          Efectivo/Débito: {accountSummary.cashDebitBalance}
        </Typography>
        <Typography variant="body1">
          Transferencias: {accountSummary.transferBalance}
        </Typography>
        <Typography variant="body1">
          Tarjeta de crédito: {accountSummary.creditCardBalance}
        </Typography>
       {/* <div>
          {Object.entries(accountSummary.creditCards).map(([cardId, cardInfo]) => (
            <Paper key={cardId} elevation={2} style={{ padding: '10px', marginBottom: '10px' }}>
              <Typography variant="body1">
                Nombre de la tarjeta: {cardInfo.name}
              </Typography>
              <Typography variant="body1">
                Cuotas: {cardInfo.installments.join(', ')}
              </Typography>
            </Paper>
          ))}
        </div>  */}
      </Paper>
      </Link>
    </>
  );
};

export default Account;
