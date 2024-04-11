// calculateCategoryTotals.js

export const calculateExpenseCategoryTotals = (actions, categoriesExpense) => {
    const expenseCategoryTotals = {};
    actions.forEach(action => {
      if (action.type === 'gastos' && action.idCategoryBills !== null) {
        const categoryName = getCategoryName(action.idCategoryBills, categoriesExpense);
        expenseCategoryTotals[categoryName] = (expenseCategoryTotals[categoryName] || 0) + action.quantity;
      }
    });
    return expenseCategoryTotals;
  };
  
  export const calculateIncomeCategoryTotals = (actions, categoriesIncome) => {
    const incomeCategoryTotals = {};
    actions.forEach(action => {
      if (action.type === 'ingresos' && action.idCategoryIncome !== null) {
        const categoryName = getCategoryName(action.idCategoryIncome, categoriesIncome);
        incomeCategoryTotals[categoryName] = (incomeCategoryTotals[categoryName] || 0) + action.quantity;
      }
    });
    return incomeCategoryTotals;
  };
  
  const getCategoryName = (categoryId, categories) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Desconocido';
  };
  