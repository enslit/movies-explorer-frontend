import React from 'react';
import './NotFound.css';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();

  return (
    <div className="not-found">
      <div className="not-found__message">
        <h1 className="not-found__code">404</h1>
        <p className="not-found__message">Страница не найдена</p>
      </div>
      <button
        type="button"
        onClick={() => history.goBack()}
        className="not-found__link-back"
      >
        Назад
      </button>
    </div>
  );
};

export default NotFound;
