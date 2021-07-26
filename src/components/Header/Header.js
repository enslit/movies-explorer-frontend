import React from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';

const Header = () => {
  return (
    <header className="header">
      <Container>
        <div className="header__container">
          <Logo />
          <Navigation />
        </div>
      </Container>
    </header>
  );
};

export default Header;
