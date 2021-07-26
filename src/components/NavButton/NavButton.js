import React from 'react';
import './NavButton.css';
import { Link } from 'react-router-dom';
import { bool } from 'prop-types';
import profileIcon from '../../images/profile-icon.svg';
import classNames from 'classnames';

const NavButton = ({ isLoggedIn }) => {
  const buttonClasses = classNames(
    'navigation-button',
    `navigation-button_type_${isLoggedIn ? 'profile' : 'login'}`
  );

  return (
    <Link to={isLoggedIn ? '/profile' : '/signin'} className={buttonClasses}>
      {isLoggedIn ? (
        <>
          Аккаунт
          <span
            className="navigation-button__icon"
            style={{ backgroundImage: `url(${profileIcon})` }}
          />
        </>
      ) : (
        'Войти'
      )}
    </Link>
  );
};

NavButton.propTypes = {
  isLoggedIn: bool,
};

export default NavButton;
