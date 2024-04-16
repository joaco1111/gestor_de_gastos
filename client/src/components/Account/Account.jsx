// Account.jsx

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchActions } from '../../redux/actions'; 
import { getAccountSummary } from './accountUtils';

const Account = () => {
  const dispatch = useDispatch(); 
  const actions = useSelector(state => state.actions); 

  useEffect(() => {
    
    dispatch(fetchActions());
  }, [dispatch]);

  const accountSummary = getAccountSummary(actions);

  return (
    <div>
      <h2>Resumen de la cuenta</h2>
      <p>Efectivo/Débito: {accountSummary.cashDebitBalance}</p>
      <p>Transferencias: {accountSummary.transferBalance}</p>
      <p>Tarjeta de crédito: {accountSummary.creditCardBalance}</p>
      <p>Nombre de la tarjeta: {accountSummary.creditCardName}</p>
      <p>Cuotas: {accountSummary.creditCardInstallments}</p>
    </div>
  );
};

export default Account;
