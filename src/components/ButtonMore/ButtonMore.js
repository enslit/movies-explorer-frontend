import React from 'react';
import './ButtonMore.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Loader from '../Loader/Loader';

const ButtonMore = ({ onClick, className, isLoading }) => {
  const classes = classNames('button-more', className);

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <Loader size={30} /> : 'Ещё'}
    </button>
  );
};

ButtonMore.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default ButtonMore;
