import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import getWeb3AndContract from '../utils/blockchain';
import '../App.css';
import './BookDetail.css';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bookId = parseInt(id, 10);
  const [bookData, setBookData] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: ''
  });

  useEffect(() => {
    const loadBlockchainData = async () => {
      const { web3, contract } = await getWeb3AndContract();
      if (!web3 || !contract) return;

      try {
        const book = await contract.methods.getBook(bookId).call();
        setBookData({
          title: book.title,
          description: book.description,
          content: book.content,
          imageUrl: book.imageUrl
        });
      } catch (error) {
        console.error('Error fetching contract data:', error);
      }
    };

    loadBlockchainData();
  }, [bookId]);

  return (
    <div className="book-detail">
       <button className="back-button" onClick={() => navigate('/')}>◀ Back</button>
      <h2>{bookData.title}</h2>
      <img className="book-detail-image" src={bookData.imageUrl} alt={bookData.title} />
      <h2>Book description</h2>
      <p>{bookData.description}</p>
      <h2>Book content</h2>
      <p>{bookData.content}</p>
    </div>
  );
};

export default BookDetail;
