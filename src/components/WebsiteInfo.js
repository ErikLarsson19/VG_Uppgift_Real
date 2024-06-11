import React from 'react';
import './WebsiteInfo.css';

const WebsiteInfo = () => {
    return (
        <div className="website-info">
            <h2>Welcome to Short Blockchain Books</h2>
            <p>Press one of the coverarts to display more information about that book and its contents</p>
            <p>The books, including its title, id, coverart and description are all pushed to the Sepolia testnet through a solidity contract</p>
        </div>
    );
}

export default WebsiteInfo;
