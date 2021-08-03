import React from 'react';
import './Container.css';
import { bool, element, node, oneOfType } from 'prop-types';
import classNames from 'classnames';

const Container = ({ children, stretchHeight }) => {
  const classes = classNames('container', {
    'container_stretch-height': stretchHeight,
  });

  return <div className={classes}>{children}</div>;
};

Container.propTypes = {
  children: oneOfType([node, element]),
  stretchHeight: bool,
};

export default Container;
