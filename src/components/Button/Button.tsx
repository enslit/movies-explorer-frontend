import React, { MouseEventHandler } from 'react';
import './Button.css';
import classNames from 'classnames';

type ButtonStyles = 'default' | 'accent' | 'secondary';
type ButtonTypes = 'button' | 'submit';

type ButtonProps = {
  children: React.ReactNode;
  style: Partial<ButtonStyles>;
  disabled: boolean;
  danger: boolean;
  onClick: MouseEventHandler;
  type: Partial<ButtonTypes>;
  className: string;
  name: string;
};

const Button = (props: ButtonProps): JSX.Element => {
  const classes: string = classNames(
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
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  danger: false,
  style: 'default',
  type: 'button',
  name: '',
};

export default Button;
