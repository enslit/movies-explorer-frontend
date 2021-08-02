import React, { useState } from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';

const Header = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const handlerCloseMenu = () => {
    setIsMenuOpened(false);
  };

  const handlerOpenMenu = () => {
    setIsMenuOpened(true);
  };

  return (
    <header className="header">
      <Container>
        <div className="header__container">
          <Logo />
          <Navigation isOpened={isMenuOpened} onClose={handlerCloseMenu} />
          <button className="header__menu-button" onClick={handlerOpenMenu}>
            <span className="menu-button__line" />
          </button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
