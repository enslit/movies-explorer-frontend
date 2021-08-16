import React from 'react';
import './Login.css';
import Logo from '../Logo/Logo';
import Form from '../Form/Form';
import FormInput from '../Form/FormInput';
import SubmitButton from '../Form/SubmitButton';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Login = ({ handleSignIn }) => {
  const handleSubmit = (values, setSubmitting, setError) => {
    handleSignIn(values).catch((error) => {
      setSubmitting(false);
      console.error(error);
      setError(error.message);
    });
  };

  return (
    <Form
      className="form"
      name="signin"
      onSubmit={handleSubmit}
      initFormValues={{
        email: '',
        password: '',
      }}
    >
      {({ form, state, handleInput, error }) => (
        <>
          <div className="form__header">
            <Logo />
            <h1 className="form__title">Рады видеть!</h1>
          </div>
          <div className="form__body">
            <FormInput
              type="email"
              name="email"
              label="Email"
              id="username-input"
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
              label="Войти"
              disabled={!state.valid}
              isFetching={state.submitting}
            />
            <p className="form__link-message">
              Ещё не зарегистрированы?&nbsp;
              <Link to="/signup" className="form__link">
                Регистрация
              </Link>
            </p>
          </div>
        </>
      )}
    </Form>
  );
};

Login.propTypes = {
  handleSignIn: PropTypes.func,
};

export default Login;
