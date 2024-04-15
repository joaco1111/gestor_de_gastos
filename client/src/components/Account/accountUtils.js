
export const getAccountSummary = (actions) => {
    let cashDebitBalance = 0;
    let transferBalance = 0;
    let creditCardBalance = 0;
    let creditCardName = '';
    let creditCardInstallments = '';
  
    actions.forEach(action => {
      if (action.type === 'ingresos') {
        cashDebitBalance += action.quantity;
      } else if (action.type === 'gastos') {
        if (action.paymentMethod === 'efectivo/debito') {
          cashDebitBalance -= action.quantity;
        } else if (action.paymentMethod === 'transferencia') {
          transferBalance -= action.quantity;
        } else if (action.paymentMethod === 'tarjeta de crédito') {
          creditCardBalance -= action.quantity;
          creditCardName = action.creditCardName;
          creditCardInstallments = action.cuotas;
        }
      }
    });
  
    return {
      cashDebitBalance,
      transferBalance,
      creditCardBalance,
      creditCardName,
      creditCardInstallments
    };
  };
  