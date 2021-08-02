import React from 'react';
import './ButtonMore.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ButtonMore = ({ onClick, className }) => {
  const classes = classNames('button-more', className);

  return (
    <button type="button" className={classes} onClick={onClick}>
      Ещё
    </button>
  );
};

ButtonMore.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ButtonMore;
