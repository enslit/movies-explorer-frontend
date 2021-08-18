import React, { useContext, useMemo } from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import NavButton from '../NavButton/NavButton';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CurrentUserContext from '../../context/CurrentUserContext';

const Navigation = ({ isOpened, onClose }) => {
  const { authorized } = useContext(CurrentUserContext);

  const navigation = useMemo(() => {
    return authorized ? (
      <>
        <li className="navigation__item navigation__item_home">
          <NavLink
            activeClassName="navigation__link_active"
            className="navigation__link"
            to="/"
            exact
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
  }, [authorized]);

  const classes = classNames('navigation', {
    navigation_authorized: authorized,
    navigation_visible: isOpened,
  });

  const classesList = classNames('navigation__list', {
    navigation__list_authorized: authorized,
  });

  const classesButtonClose = classNames('navigation__close', {
    navigation__close_authorized: authorized,
  });

  return (
    <nav className={classes}>
      <button
        className={classesButtonClose}
        onClick={onClose}
        aria-label="Кнопка закрытия меню"
      />
      <ul className={classesList}>{navigation}</ul>
      <NavButton isLoggedIn={authorized} />
    </nav>
  );
};

Navigation.propTypes = {
  isOpened: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Navigation;
