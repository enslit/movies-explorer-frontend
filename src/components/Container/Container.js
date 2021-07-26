import React from 'react';
import './Container.css';
import { bool, element, node, oneOfType } from 'prop-types';
import classNames from 'classnames';

const Container = ({ children, withBackground }) => {
  const classes = classNames('container', {
    'container_with-background': withBackground,
  });

  return <div className={classes}>{children}</div>;
};

Container.propTypes = {
  children: oneOfType([node, element]),
  withBackground: bool,
};

export default Container;
