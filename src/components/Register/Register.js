import React from 'react';
import './Register.css';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import FormInput from '../Form/FormInput';
import SubmitButton from '../Form/SubmitButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Register = ({ handleSignUp }) => {
  const handleSubmit = ({ name, email, password }, setSubmitting, setError) => {
    handleSignUp({ name, email, password })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Form
      className="form"
      name="signup"
      onSubmit={handleSubmit}
      initFormValues={{
        name: '',
        email: '',
        password: '',
      }}
    >
      {({ form, state, handleInput, error }) => (
        <>
          <div className="form__header">
            <Logo />
            <h1 className="form__title">Добро пожаловать!</h1>
          </div>
          <div className="form__body">
            <FormInput
              type="text"
              name="name"
              label="Имя"
              id="name-input"
              className="form__input form__input_type_name"
              required
              minLength={3}
              onChange={handleInput}
              value={form.name.value}
              disabled={state.submitting}
            />
            <FormInput
              type="email"
              name="email"
              label="E-mail"
              id="email-input"
              className="form__input form__input_type_email"
              required
              onChange={handleInput}
              value={form.email.value}
              disabled={state.submitting}
            />
            <FormInput
              type="password"
              name="password"
              label="Пароль"
              id="password-input"
              className="form__input form__input_type_password"
              required
              onChange={handleInput}
              value={form.password.value}
              disabled={state.submitting}
            />
          </div>
          <div className="form__actions">
            {error && <span className="form__request-error">{error}</span>}
            <SubmitButton
              label="Зарегистрироваться"
              disabled={!state.valid}
              isFetching={state.submitting}
            />
            <p className="form__link-message">
              Уже зарегистрированы?&nbsp;
              <Link to="/signin" className="form__link">
                Войти
              </Link>
            </p>
          </div>
        </>
      )}
    </Form>
  );
};

Register.propTypes = {
  handleSignUp: PropTypes.func,
};

export default Register;
