import React, { useEffect, useState } from 'react';
import './Form.css';
import { func, object, string } from 'prop-types';

const Form = ({ initFormValues, onSubmit, children, ...props }) => {
  const init = {};
  Object.keys(initFormValues).forEach((key) => {
    init[key] = {
      value: initFormValues[key]?.value ?? initFormValues[key],
      valid: initFormValues[key]?.valid ?? false,
    };
  });
  const [form, setForm] = useState(init);
  const [submitting, setSubmitting] = useState(false);
  const [valid, setValid] = useState(false);

  const handleInput = (value, name, valid) => {
    setForm({
      ...form,
      [name]: { value, valid },
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setSubmitting(true);

    const values = {};
    Object.keys(form).forEach((field) => (values[field] = form[field].value));
    onSubmit(values, setSubmitting);
  };

  useEffect(() => {
    if (Object.keys(form).some((field) => form[field].valid === false)) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [form]);

  const state = { submitting, valid };

  return (
    <div className="form-container">
      <form noValidate onSubmit={handleSubmit} {...props}>
        {children({ form, state, handleInput })}
      </form>
    </div>
  );
};

Form.propTypes = {
  initFormValues: object.isRequired,
  onSubmit: func.isRequired,
  children: func,
  name: string,
};

export default Form;
