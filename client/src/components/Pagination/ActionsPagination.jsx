import React, { useState } from 'react';
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