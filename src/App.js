import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';

function App() {
  const [contractData, setContractData] = useState('');

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

      // Define the contract ABI and address
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
          "name": "getBookContent",
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

      // Call the contract function and set the state with the result
      try {
        const bookId = 0; //Hardcoded for now
        const data = await contract.methods.getBookContent(bookId).call();
        setContractData(data);
      } catch (error) {
        console.error('Error fetching contract data:', error);
      }
    };

    loadBlockchainData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>ShortBooks</h1>
        {contractData && <p>Book Content: {contractData}</p>}
      </header>
    </div>
  );
}

export default App;
