import React, { useState } from 'react';
<<<<<<< HEAD
import Pagination from 'react-bootstrap/Pagination';

const ActionsPagination = ({ totalCount, limit, onPageChange }) => {
    const pages = Math.ceil(totalCount / limit);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < pages) {
            setCurrentPage(currentPage + 1);
            onPageChange(currentPage + 1);
        }
    };

    let items = [];
    for (let number = 1; number <= pages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <Pagination>
            <Pagination.Prev onClick={handlePrevious} disabled={currentPage === 1} />
            {items}
            <Pagination.Next onClick={handleNext} disabled={currentPage === pages} />
        </Pagination>
    );
};

export default ActionsPagination;
=======
import { Pagination } from 'react-bootstrap';
import './ActionsPagination.css';

const ActionsPagination = ({ currentPage, totalCount, limitPerPage, onPageChange, filters }) => {
  if (typeof totalCount !== 'number' || typeof limitPerPage !== 'number' || totalCount <= 0 || limitPerPage <= 0) {
    return null;
  }

  const totalPages = Math.ceil(totalCount / limitPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page, filters);
    }
  };

  return (
    <Pagination>
      <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item
          key={index}
          active={index + 1 === currentPage}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
    </Pagination>
  );
};

export default ActionsPagination;
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
