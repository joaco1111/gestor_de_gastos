import create from 'zustand';
import axios from 'axios';

//Recupero el token del local Storage
const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
//config general, si necesitas otra configuración como params, agregala dentro de tu función
var config = {}

if(loggedUserJSON){
    const token = JSON.parse(loggedUserJSON);
    config["headers"] = {
        token: token.tokenUser,
    };
}

export const useCategoriesStore = create((set, get) => ({
    categoryBills: {},          //Estos 3 estados pueden ser innecesarios
    categoryIncomes: {},        //Estos 3 estados pueden ser innecesarios
    deletedCategory: {},        //Estos 3 estados pueden ser innecesarios
    createCategory: async(categoryType, category) => {
        if(categoryType === 'income') {
            const categoryIncomes = (await axios.post(`${import.meta.env.VITE_BASE_URL}/categoryIncome`, category, config)).data;
            set({ categoryIncomes });
        }
        if(categoryType === 'bill') {
            const categoryBills = (await axios.post(`${import.meta.env.VITE_BASE_URL}/categoryBills`, category, config)).data;   
            set({ categoryBills });
        }
    },
    deleteCategory: async(categoryType, id) => {
        if(categoryType === 'bill') {
            const expenseCategoryRemoved = (await axios.delete(`${import.meta.env.VITE_BASE_URL}/categoryBills/${id}`, config)).data;
            console.log(expenseCategoryRemoved);
            set({ deletedCategory: expenseCategoryRemoved});
        }
        if(categoryType === 'income') {
            const incomeCategoryRemoved = (await axios.delete(`${import.meta.env.VITE_BASE_URL}/categoryIncome/${id}`, config)).data;
            console.log(incomeCategoryRemoved);
            set({ deletedCategory: incomeCategoryRemoved});
        }
    }
}));