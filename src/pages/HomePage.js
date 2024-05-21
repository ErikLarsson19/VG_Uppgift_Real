import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import getWeb3AndContract from '../utils/blockchain';
import WebsiteInfo from '../components/WebsiteInfo';
import '../App.css';

const HomePage = () => {
  const [covers, setCovers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBookCovers = async () => {
      const { web3, contract } = await getWeb3AndContract();
      if (!web3 || !contract) return;

      try {
        const bookIndices = [0, 1, 2];
        const coverPromises = bookIndices.map(index => contract.methods.getBookCover(index).call());

        const covers = await Promise.all(coverPromises);
        console.log('Fetched covers:', covers);
        setCovers(covers);
      } catch (error) {
        console.error('Error fetching book covers:', error);
      }
    };

    loadBookCovers();
  }, []);

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="home-page">
    <div className= "book-list">
    {covers.map((coverUrl, index) => (
        <BookCard
          key={index}
          coverUrl={coverUrl}
          onClick={() => handleBookClick(index)}
        />
      ))}
    </div>
      <WebsiteInfo />
    </div>
    
  );
};

export default HomePage;
