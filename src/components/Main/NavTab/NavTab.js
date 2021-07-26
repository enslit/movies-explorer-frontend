import React from 'react';
import './NavTab.css';
import { string } from 'prop-types';

const NavTab = ({ label, anchor }) => {
  return (
    <a href={`/#${anchor}`} className="nav-tab">
      {label}
    </a>
  );
};

NavTab.propTypes = {
  label: string.isRequired,
  anchor: string.isRequired,
};

export default NavTab;
