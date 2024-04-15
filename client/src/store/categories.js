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
    categoryBills: {},         
    categoryIncomes: {},        
    deletedCategory: {},        
    incomeError: '',
    billError: '',
    createCategory: async(categoryType, category) => {
        if(categoryType === 'income') {
            try {
                const categoryIncomes = (await axios.post(`${import.meta.env.VITE_BASE_URL}/categoryIncome`, category, config)).data;
                console.log(categoryIncomes)
                set({ categoryIncomes });
            } catch (error) {
                console.log(error);
                set({ incomeError: error.response.data});
            }
        }
        if(categoryType === 'bill') {
            try {
                const categoryBills = (await axios.post(`${import.meta.env.VITE_BASE_URL}/categoryBills`, category, config)).data;  
                console.log(categoryBills);
                set({ categoryBills });
            } catch (error) {
                set({ billError: error.response.data});
            }
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
    },
    updateIncomeError: () => {
        set({ incomeError: '' });
    },
    updateBillError: () => {
        set({ billError: '' });
    },
}));