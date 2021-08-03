import React from 'react';
import './ExternalLink.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ExternalLink = ({ to, className, children }) => {
  const classes = classNames('external-link', className);

  return (
    <a href={to} target="_blank" rel="nofollow noreferrer" className={classes}>
      {children}
    </a>
  );
};

ExternalLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  className: PropTypes.string,
};

export default ExternalLink;
