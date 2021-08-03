import React from 'react';
import './Button.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = (props) => {
  const classes = classNames(
    'button',
    {
      [`button_style_${props.style}`]: props.style,
      button_disabled: props.disabled,
      button_danger: props.danger,
    },
    props.className
  );

  return (
    <button
      type={props.type}
      name={props.name}
      className={classes}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  style: PropTypes.oneOf(['default', 'accent', 'secondary']),
  disabled: PropTypes.bool,
  danger: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit']),
  className: PropTypes.string,
  name: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  danger: false,
  style: 'default',
  type: 'button',
  onClick: () => {},
  name: '',
};

export default Button;
