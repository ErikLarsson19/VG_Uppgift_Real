import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import BookCard from '../components/BookCard';
import '../App.css';

const HomePage = () => {
  const [covers, setCovers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBookCovers = async () => {
      const network = process.env.REACT_APP_ETHEREUM_NETWORK;
      const infuraApiKey = process.env.REACT_APP_INFURA_API_KEY;

      if (!network || !infuraApiKey) {
        console.error('Missing environment variables for network or Infura API key');
        return;
      }

      const web3 = new Web3(
        new Web3.providers.HttpProvider(
          `https://${network}.infura.io/v3/${infuraApiKey}`
        )
      );

      const contractAddress = '0xE7307dd81273F2a40313636485FE5183268CF094';
      const contractABI = [
        {
          "constant": true,
          "inputs": [
            {
              "name": "_id",
              "type": "uint256"
            }
          ],
          "name": "getBookCover",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        }
      ];

      const contract = new web3.eth.Contract(contractABI, contractAddress);

      try {
        const bookIndices = [0, 1, 2]; //Only three set books in the contract   
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
      {covers.map((coverUrl, index) => (
        <BookCard
          key={index}
          coverUrl={coverUrl}
          onClick={() => handleBookClick(index)}
        />
      ))}
    </div>
  );
};

export default HomePage;
