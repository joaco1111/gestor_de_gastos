// accountUtils.js
export const getAccountSummary = (actions) => {
  let cashDebitBalance = 0;
  let transferBalance = 0;
  let creditCardBalance = 0;
  let creditCards = {}; 

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

        if (!creditCards[action.creditCardId]) {
          creditCards[action.creditCardId] = { name: action.creditCard.name, installments: [] }; 
        }
        
        creditCards[action.creditCardId].installments.push(action.cuotas);
      }
    }
  });

  return {
    cashDebitBalance,
    transferBalance,
    creditCardBalance,
    creditCards
  };
};
