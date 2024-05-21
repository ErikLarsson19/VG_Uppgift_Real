import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';


const NavBar = () => {
    return (
        <nav className = "navbar">
            <Link to = "/" className="navbar-brand">Short BlockChain Books</Link>
            </nav>
    );
};


export default NavBar;