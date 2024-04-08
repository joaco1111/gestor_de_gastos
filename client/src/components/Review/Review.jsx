import React, { useState } from 'react';
import './Review.css';
import NavBar from '../NavBar/NavBar';

const Opiniones = () => {
    const [nuevoComentario, setNuevoComentario] = useState('');
    const [puntuacion, setPuntuacion] = useState(0);
    const [opiniones, setOpiniones] = useState([]);
    const [error, setError] = useState('');
      
    const handleChange = (event) => {
      setNuevoComentario(event.target.value);
    };

    const handlePuntuacion = (rating) => {
        setPuntuacion(rating);
    };
      
    const handleSubmit = (event) => {
      event.preventDefault();
      if (puntuacion === 0) {
        setError('Por favor, selecciona una puntuación antes de enviar tu comentario.');
      } else {
        setOpiniones([...opiniones, { comentario: nuevoComentario, puntuacion }]);
        setNuevoComentario('');
        setPuntuacion(0);
        setError('');
      }
    };
      
    return (
        <>
            <NavBar />
            <div className="opiniones-container">
                
                <h2>Opiniones de nuestros clientes</h2>
                <div className="opiniones">
                    {opiniones.map((opinion, index) => (
                        <div key={index} className="opinion">
                            <div className="cliente-info">
                                <img src="https://i.pinimg.com/564x/bd/1c/c7/bd1cc751865c67de695216da045579d5.jpg" alt="Foto del cliente" className="avatar" />
                                <div>
                                    <h3>Cliente {index + 1}</h3>
                                    <p>Fecha de la opinión: {new Date().toLocaleDateString()}</p>
                                </div>
                            </div>
                            <p className="texto-opinion">{opinion.comentario}</p>
                            <div className="puntuacion">
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
                                            <span className="icon" style={{ color: ratingValue <= puntuacion ? '#f39c12' : '#ccc' }}>&#9733;</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="nuevo-comentario">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={nuevoComentario}
                            onChange={handleChange}
                            placeholder="Agrega tu comentario aquí..."
                            required
                        ></textarea>
                        <div className="puntuacion">
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
                                        <span className="icon" style={{ color: ratingValue <= puntuacion ? '#f39c12' : '#ccc' }}>&#9733;</span>
                                    </label>
                                );
                            })}
                        </div>
                        <button type="submit">Agregar Comentario</button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                </div>
            </div>
        </>
    );
}

export default Opiniones;
