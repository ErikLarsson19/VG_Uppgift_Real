import Web3 from 'web3';

const getWeb3AndContract = async () => {
    const network = process.env.REACT_APP_ETHEREUM_NETWORK;
    const infuraApiKey = process.env.REACT_APP_INFURA_API_KEY;

    if(!network || !infuraApiKey) {
        console.error('Missing environment variables for network or Infura API key');
        return null;
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

      const contract = new web3.eth.Contract(contractABI, contractAddress);

      return { web3, contract };
};

export default getWeb3AndContract;