import  create  from 'zustand';
import axios from 'axios';

const {VITE_BASE_URL} = import.meta.env;
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
    review: [],
        reviewUnlock: [],
        unlock: [],
        error: null,
        getReview: async()=> {
            try {
                const {data} = await axios.get(`${VITE_BASE_URL}/review`, config);
                
                set({review: data})
            } catch (error) {
                set({ error: error.message})
            }
        },
        unlockReview: async(id) =>{
            try{
                await axios.delete(`${VITE_BASE_URL}/unLockReview/${id}`, config);

          } catch (error) {
            set({error: error.message})
          } 
        },
        delete: async(id)=> {
            try {
                await axios.delete(`${VITE_BASE_URL}/review/${id}`, config);

            } catch (error) {
                set({error: error.message})
            }
        },
        restore: async(id) => {
            try {
                await axios.post(`${VITE_BASE_URL}/restoreReview/${id}`, {},config);

            } catch (error) {
                set({error: error.message})
            }
        },
        getReviewUnlock:  async()=> {
            try {
                const {data} = await axios.get(`${VITE_BASE_URL}/unlockReview`, config);
                
                set({reviewUnlock: data})
            } catch (error) {
                console.log({ error: error.response.data});
            }
        },
        deleteMessage: ()=> {
            set({error: null})
        },
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