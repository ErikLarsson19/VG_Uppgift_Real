import Web3 from 'web3';

//Initializes the Web3 instance and the contract object
const getWeb3AndContract = async () => {
    const network = process.env.REACT_APP_ETHEREUM_NETWORK;
    const infuraApiKey = process.env.REACT_APP_INFURA_API_KEY;

    // Check if the network and Infura API key are set
    if(!network || !infuraApiKey) {
        console.error('Missing environment variables for network or Infura API key');
        return null;
    }

    // Initalizes the Web3 instance using Infura as the provider
    const web3 = new Web3(
        new Web3.providers.HttpProvider(
            `https://${network}.infura.io/v3/${infuraApiKey}`
        )
    );

    //The contract address, links to the contract created in Solidity
    const contractAddress = '0xE7307dd81273F2a40313636485FE5183268CF094';
    //The contract Application Binary Interface (ABI) which is a JSON representation of the contract
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
        },
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

      //Initalizes the contract object using the ABI and contract address
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      //Returns the Web3 instance and contract object
      return { web3, contract };
};

export default getWeb3AndContract;