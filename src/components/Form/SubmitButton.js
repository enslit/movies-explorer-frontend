import React from 'react';
import { bool, string } from 'prop-types';
import Loader from '../Loader/Loader';
import classNames from 'classnames';
import Button from '../Button/Button';

function SubmitButton({ label, isFetching, disabled }) {
  const classes = classNames('form__save', {
    form__save_disabled: disabled,
  });

  return (
    <Button
      type="submit"
      name="save"
      style="secondary"
      className={classes}
      disabled={disabled || isFetching}
    >
      {isFetching ? <Loader size={30} /> : label}
    </Button>
  );
}

SubmitButton.propTypes = {
  label: string.isRequired,
  isFetching: bool,
  disabled: bool,
};

SubmitButton.defaultProps = {
  isFetching: false,
  disabled: false,
};

export default SubmitButton;
