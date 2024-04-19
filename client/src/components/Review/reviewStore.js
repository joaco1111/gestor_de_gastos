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
      try {
        const reviewData = { ranking: puntuacion, comment: comentario };
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/review`, reviewData, config);
        // Verificar si la revisión ya existe en el estado local
        const reviewExists = set((state) => state.reviews.some(review => review.comment === comentario));
        // Agregar la revisión solo si no existe en el estado local
        if (!reviewExists) {
          set((state) => ({ reviews: [...state.reviews, response.data] }));
        }
        console.log('Reseña enviada correctamente:', response.data);
      } catch (error) {
        console.error('Error al enviar la reseña:', error);
      }
    },
  }));

export { useReviewStore };