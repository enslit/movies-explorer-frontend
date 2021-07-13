import React, { useMemo } from 'react';
import './Navigation.css';
import { useAuth } from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const { isLoggedIn } = useAuth();

  const navigation = useMemo(() => {
    return isLoggedIn ? (
      <>
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
        <li className="navigation__item">
          <NavLink
            activeClassName="navigation__link_active"
            className="navigation__link navigation__link_type_profile"
            to="/profile"
          >
            Аккаунт
          </NavLink>
        </li>
      </>
    ) : (
      <>
        <li className="navigation__item">
          <NavLink
            activeClassName="navigation__link_active"
            className="navigation__link navigation__link_type_login"
            to="/signin"
          >
            Войти
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

  return (
    <nav className="navigation">
      <ul className="navigation__list">{navigation}</ul>
    </nav>
  );
};

export default Navigation;
