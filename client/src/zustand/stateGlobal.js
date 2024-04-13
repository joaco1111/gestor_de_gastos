import  axios from 'axios';
import {create} from 'zustand';

const {VITE_BASE_URL} = import.meta.env;
const localToken =  JSON.parse(window.localStorage.getItem('loggedNoteAppUser'));

const config = {
    headers: {
        token: localToken?.tokenUser
    }
}

export const useStateGlobal = create((set) => {
    return {
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
                set({ error: error.response.data})
            }
        },
        deleteMessage: ()=> {
            set({error: null})
        }
    }
})