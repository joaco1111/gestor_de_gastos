import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import './ReviewForm.css';
import ReviewList from  './ReviewsList';
import { useCategoriesStore } from '../../store/categories';


const ReviewForm = () => {
  
  const addReview = useCategoriesStore(state => state.addReview);
  const fetchReviews = useCategoriesStore(state => state.fetchReviews);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [puntuacion, setPuntuacion] = useState(0);
  const [error, setError] = useState('');

  useEffect(()=>{
    fetchReviews();
  },[])

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

        await addReview(nuevoComentario, puntuacion);
        await fetchReviews()
        setNuevoComentario('');
        setPuntuacion(0);
        setError('');

      } catch (error) {

        console.error('Error al enviar la reseña:', error);
        setError('Error al enviar la reseña. Por favor, intenta nuevamente.');
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="main-content" style={{ marginTop: '60px' }}>
        <div className="review-form-container">
          <h2>Dejanos tu opinión</h2>
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
      <ReviewList /> 
    </>
  );
};

export default ReviewForm;
