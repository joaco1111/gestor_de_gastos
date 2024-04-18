import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Typography } from '@mui/material';
import { fetchActions } from '../../redux/actions';
import { getAccountSummary } from './accountUtils';
import CashIcon from '@mui/icons-material/Money';
import TransferIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
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
        <Typography variant="h5"  >
          Cuentas
        </Typography>
        <Typography variant='h6' sx={{ fontFamily: 'K2D, sans-serif', fontSize: 20 }}>
          <CashIcon sx={{ fontSize: 30, color: 'green', mr: 1 }} />Efectivo/Débito: ${accountSummary.cashDebitBalance}
        </Typography>
        <Typography variant='h6' sx={{ fontFamily: 'K2D, sans-serif', fontSize: 20 }}>
          <TransferIcon sx={{ fontSize: 30, color: 'blue', mr: 1 }} />Transferencias: ${accountSummary.transferBalance}
        </Typography>
        <Typography variant='h6' sx={{ fontFamily: 'K2D, sans-serif', fontSize: 20 }}>
          <CreditCardIcon sx={{ fontSize: 30, color: 'orange', mr: 1 }}/>Tarjeta de crédito: ${accountSummary.creditCardBalance}
        </Typography>
     
      </Paper>
      </Link>
    </>
  );
};

export default Account;
