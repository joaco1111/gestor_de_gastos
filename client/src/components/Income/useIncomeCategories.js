import { useState } from 'react';

const useIncomeCategories = () => {
  const [categories, setCategories] = useState([
    'Salario',
    'Ventas',
    'Bonificaciones',
    'Regalías',
    'Otros'
  ]);

  const addIncomeCategory = (category) => {
    setCategories([...categories, category]);
  };

  const deleteIncomeCategory = (categoryIndex) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(categoryIndex, 1);
    setCategories(updatedCategories);
  };

  return {
    incomeCategories: categories,
    addIncomeCategory,
    deleteIncomeCategory
  };
};

export default useIncomeCategories;
