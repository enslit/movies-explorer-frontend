import React from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <Link to="/">Logo</Link>
      <Navigation />
    </div>
  );
};

export default Header;
