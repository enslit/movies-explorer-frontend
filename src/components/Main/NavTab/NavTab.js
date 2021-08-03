import React from 'react';
import './NavTab.css';
import { string } from 'prop-types';

const NavTab = ({ label, anchor }) => {
  const handlerClick = (e) => {
    e.preventDefault();
    document.querySelector(`#${anchor}`).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <span className="nav-tab" onClick={handlerClick}>
      {label}
    </span>
  );
};

NavTab.propTypes = {
  label: string.isRequired,
  anchor: string.isRequired,
};

export default NavTab;
