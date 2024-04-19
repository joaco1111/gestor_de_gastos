import React, { useEffect } from 'react';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { Container, Row, Col } from 'react-bootstrap';
import './ReviewsList.css';
import { useCategoriesStore } from '../../store/categories';


const ReviewsList = () => {
  //nos traemos del estado global zustand reviews y la funcion encargada de hacer fetch a los datos
  const reviews = useCategoriesStore(state =>  state.reviews);
  const fetchReviews = useCategoriesStore(state =>  state.fetchReviews);

  useEffect(() => {
    fetchReviews(); 
  }, []);

  const StarRating = ({ rating }) => {
    const filledStars = Array.from({ length: rating }, (_, index) => <BsStarFill key={index} />);
    const emptyStars = Array.from({ length: 5 - rating }, (_, index) => <BsStar key={index} />);

    return (
      <div className="star-rating">
        {filledStars}
        {emptyStars}
      </div>
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="reviews-list-container">
            {reviews.length > 0 ? <h2>Comentarios</h2> : ""}
            <ul className="reviews-list">
              {reviews.map((review) => (
                <li key={review.id} className="review-item">
                  <StarRating rating={review.ranking} />
                  <p>Comentario: {review.comment}</p>
                  <p>Fecha y hora: {new Date(review.createdAt).toLocaleString()}</p> 
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ReviewsList;
