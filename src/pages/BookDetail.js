import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';

const BookDetail = () => {
  const { id } = useParams();
  const bookId = parseInt(id, 10);
  const [bookData, setBookData] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: ''
  });

  useEffect(() => {
    const loadBlockchainData = async () => {
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
          "name": "getBook",
          "outputs": [
            {
              "components": [
                { "name": "id", "type": "uint256" },
                { "name": "title", "type": "string" },
                { "name": "description", "type": "string" },
                { "name": "content", "type": "string" },
                { "name": "imageUrl", "type": "string" }
              ],
              "name": "",
              "type": "tuple"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        }
      ];

      const contract = new web3.eth.Contract(contractABI, contractAddress);

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
      <h2>{bookData.title}</h2>
      <img src={bookData.imageUrl} alt={bookData.title} />
      <p>{bookData.description}</p>
      <p>{bookData.content}</p>
    </div>
  );
};

export default BookDetail;