import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import { useReviewStore } from './reviewStore';
import './ReviewForm.css';
import  ReviewList from './ReviewsList';

const localToken = JSON.parse(window.localStorage.getItem('loggedNoteAppUser'));

const config = {
  headers: {
    token: localToken?.tokenUser
  }
};

const ReviewForm = () => {
  const { addReview } = useReviewStore();
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [puntuacion, setPuntuacion] = useState(0);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setNuevoComentario(event.target.value);
  };

  const handlePuntuacion = (rating) => {
    setPuntuacion(rating);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (puntuacion === 0) {
      setError('Por favor, selecciona una puntuación antes de enviar tu comentario.');
    } else {
      try {
        const reviewData = { ranking: puntuacion, comment: nuevoComentario };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/review`, reviewData, config);

        // Verifica si el comentario ya existe en la lista de reseñas antes de agregarlo
        if (!addReviewExists(nuevoComentario, response.data)) {
          addReview(nuevoComentario, puntuacion);
        }

        setNuevoComentario('');
        setPuntuacion(0);
        setError('');
        console.log('Reseña enviada correctamente:', response.data);

        // Recarga la página automáticamente después de enviar el comentario
        window.location.reload();
      } catch (error) {
        console.error('Error al enviar la reseña:', error);
        setError('Error al enviar la reseña. Por favor, intenta nuevamente.');
      }
    }
  };

  // Función para verificar si el comentario ya existe en la lista de reseñas
  const addReviewExists = (comment, reviewData) => {
    if (reviewData && reviewData.review) {
      return reviewData.review.some(review => review.comment === comment);
    } else {
      return false;
    }
  };

  return (
    <>
      <NavBar />
      <div className="main-content" style={{ marginTop: '60px' }}>
        <div className="review-form-container">
          <h2>Haz tu opinión</h2>
          <div className="new-comment-container">
            <form onSubmit={handleSubmit}>
              <textarea
                value={nuevoComentario}
                onChange={handleChange}
                placeholder="Agrega tu comentario aquí..."
                required
              ></textarea>
              <div className="rating-container">
                {[...Array(5)].map((_, i) => {
                  const ratingValue = i + 1;
                  return (
                    <label key={i}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onChange={() => handlePuntuacion(ratingValue)}
                        checked={ratingValue === puntuacion}
                      />
                      <span className="star" style={{ color: ratingValue <= puntuacion ? '#f39c12' : '#ccc' }}>&#9733;</span>
                    </label>
                  );
                })}
              </div>
              <button type="submit">Enviar</button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        </div>
      </div>
      <ReviewList/>
    </>
  );
};

export default ReviewForm;
