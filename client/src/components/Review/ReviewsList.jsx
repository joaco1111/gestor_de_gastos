import React, { useEffect } from 'react';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { Container, Row, Col } from 'react-bootstrap';
import { useReviewStore } from './reviewStore';
import './ReviewsList.css';

const ReviewsList = () => {
  const { reviews, fetchReviews } = useReviewStore();

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
            <h2>Reseñas</h2>
            <ul className="reviews-list">
              {reviews.map((review, index) => (
                <li key={index} className="review-item">
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
