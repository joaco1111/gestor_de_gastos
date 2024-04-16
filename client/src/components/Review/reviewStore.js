import create from 'zustand';
import axios from 'axios';

const localToken = JSON.parse(window.localStorage.getItem('loggedNoteAppUser'));

const config = {
   headers: {
     token: localToken?.tokenUser
   }
 }

const useReviewStore = create((set) => ({
  reviews: [],
  fetchReviews: async () => {
    try {
      const response = await axios.get('http://localhost:3001/review', config);
      set({ reviews: response.data });
    } catch (error) {
      console.error('Error al obtener las reseñas:', error);
    }
  },
  addReview: async (comentario, puntuacion) => {
    // Lógica para enviar la revisión al servidor y actualizar el estado de las revisiones
    try {
      const reviewData = { ranking: puntuacion, comment: comentario };
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/review`, reviewData, config);
      set((state) => ({ reviews: [...state.reviews, response.data] }));
      console.log('Reseña enviada correctamente:', response.data);
    } catch (error) {
      console.error('Error al enviar la reseña:', error);
    }
  },
}));

export { useReviewStore };
