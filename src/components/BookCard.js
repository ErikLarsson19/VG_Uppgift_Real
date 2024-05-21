import React from 'react';

const BookCard = ({coverUrl, onClick} ) => {
    return (
        <div className="book-card" onClick={onClick}>
        <img src={coverUrl} alt="Book cover" />
        </div>
    );
};

export default BookCard;