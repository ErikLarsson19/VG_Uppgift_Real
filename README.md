# Short Blockchain Books

## Overview

Simple web application that showcases how a website can interact with a Solidity contract pushed to the Sepolia testnet.
The collection of small "books" are stored on the blockchain. Each books metadata including its title, description, content and cover image,
is fetched from the smart contract deployed on the Sepolia testnet. This project demonstrates the intergation of React with blockchain technology in a simple manner, very cool!

## Features

- **Home Page**: Displays a list of book covers fetched from the blockchain.
- **Book Detail Page**: Shows detailed information about a selected book, including its title, description, content, and cover image.
- **Blockchain Integration**: Utilizes a smart contract to store and retrieve book data.


## Getting Started

To get started with this project, you'll need to create a `.env` file in the root directory of the project. This file should contain the following environment variables:

```plaintext
REACT_APP_ETHEREUM_NETWORK=sepolia
REACT_APP_INFURA_API_KEY=your_infura_api_key_here

The network used for this application is the Sepolia testnet

The API key can be obtained from the Infura website where you have to sign up for an account or login if you already have one.
Create a new project and aquire your Infura API key.
Replace your_infura_api_key_here in the .env file with your actual Infura API key.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: Node package manager, which comes with Node.js.


## Installation

Clone the repository!!

npm install

npm start

# License

This project is licensed under the MIT License. See the LICENSE file for details.

# Acknowledgements

Thanks to the developers of React, React Router, and Web3.js for their excellent libraries. Thank you!
