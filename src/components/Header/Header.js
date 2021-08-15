import React, { useContext, useState } from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import CurrentUserContext from '../../context/CurrentUserContext';

const Header = () => {
  const { authorized } = useContext(CurrentUserContext);
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
          {authorized && (
            <button className="header__menu-button" onClick={handlerOpenMenu}>
              <span className="menu-button__line" />
            </button>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
