import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import getWeb3AndContract from '../utils/blockchain';
import WebsiteInfo from '../components/WebsiteInfo';
import '../App.css';

const HomePage = () => {
  const [covers, setCovers] = useState([]); //State to store the book covers
  const navigate = useNavigate(); //Navigate to the book detail page


  //Function to load book covers from the blockchain
  useEffect(() => {
    const loadBookCovers = async () => {
      const { web3, contract } = await getWeb3AndContract();
      if (!web3 || !contract) return;

      try {
        const bookIndices = [0, 1, 2]; //Hardcoded because we know there are 3 books in the contract
        //Fetch the book cover for each book index
        const coverPromises = bookIndices.map(index => contract.methods.getBookCover(index).call());

        //Wait for all the promises to resolve
        const covers = await Promise.all(coverPromises);
        console.log('Fetched covers:', covers);
        setCovers(covers); //Set the covers in the state
      } catch (error) {
        console.error('Error fetching book covers:', error);
      }
    };

    //Call the function to load book covers
    loadBookCovers();
  }, []);

    //Function to handle the click on a book cover
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
