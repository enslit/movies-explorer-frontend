import React from 'react';
import './SwitchButton.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SwitchButton = ({ isActive, label, onChange, className }) => {
  const classes = classNames('switch-button__switch', className, {
    'switch-button__switch_active': isActive,
  });

  return (
    <div className="switch-button" onClick={onChange}>
      <span className={classes} />
      <span className="switch-button__label">{label}</span>
    </div>
  );
};

SwitchButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default SwitchButton;
