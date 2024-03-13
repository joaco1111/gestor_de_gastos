
import { useState } from 'react';

const useCategories = () => {
  const [categories, setCategories] = useState([
    'Alimentación',
    'Transporte',
    'Salud',
    'Educación',
    'Entretenimiento',
    'Ocio',
    'Familia',
    'Casa',
    'Otros'

  ]);

  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  const deleteCategory = (categoryIndex) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(categoryIndex, 1);
    setCategories(updatedCategories);
  };

  return {
    categories,
    addCategory,
    deleteCategory
  };
};

export default useCategories;
