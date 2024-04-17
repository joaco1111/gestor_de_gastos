import React, { useState } from 'react';
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
