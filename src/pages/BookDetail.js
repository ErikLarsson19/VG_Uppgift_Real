import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import getWeb3AndContract from '../utils/blockchain';
import '../App.css';
import './BookDetail.css';

const BookDetail = () => {
  const { id } = useParams(); //Hook to get the ID from URL params
  const navigate = useNavigate(); //Hook to navigate to a different page
  const bookId = parseInt(id, 10); //Parsing the book ID to an integer
  const [bookData, setBookData] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: ''
  }); //State to hold the book data

  useEffect(() => {
    //function to load book data from the blockchain
    const loadBlockchainData = async () => {
      const { web3, contract } = await getWeb3AndContract();
      if (!web3 || !contract) return;

      try {
        // Fecthing the book data using the getBook function in the contract
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

    loadBlockchainData(); //Call function to load book data
  }, [bookId]); //Dependency array to run the effect when bookID changes

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
