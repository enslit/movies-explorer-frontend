import React, { useMemo } from 'react';
import './Navigation.css';
import { useAuth } from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';
import NavButton from '../NavButton/NavButton';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Navigation = ({ isOpened, onClose }) => {
  const { isLoggedIn } = useAuth();

  const navigation = useMemo(() => {
    return isLoggedIn ? (
      <>
        <li className="navigation__item navigation__item_home">
          <NavLink
            activeClassName="navigation__link_active"
            className="navigation__link"
            to="/"
          >
            Главная
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            activeClassName="navigation__link_active"
            className="navigation__link"
            to="/movies"
          >
            Фильмы
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            activeClassName="navigation__link_active"
            className="navigation__link"
            to="/saved-movies"
          >
            Сохраненные фильмы
          </NavLink>
        </li>
      </>
    ) : (
      <>
        <li className="navigation__item navigation__item_home">
          <NavLink
            activeClassName="navigation__link_active"
            className="navigation__link"
            to="/"
          >
            Главная
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            activeClassName="navigation__link_active"
            className="navigation__link"
            to="/signup"
          >
            Регистрация
          </NavLink>
        </li>
      </>
    );
  }, [isLoggedIn]);

  const classes = classNames('navigation', {
    navigation_visible: isOpened,
  });

  return (
    <nav className={classes}>
      <button
        className="navigation__close"
        onClick={onClose}
        aria-label="Кнопка закрытия меню"
      />
      <ul className="navigation__list">{navigation}</ul>
      <NavButton isLoggedIn={isLoggedIn} />
    </nav>
  );
};

Navigation.propTypes = {
  isOpened: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Navigation;
