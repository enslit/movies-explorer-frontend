import React from 'react';
import { render } from 'react-dom';
import App from './components/App/App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ProvideAuth } from './hooks/useAuth';

render(
  <React.StrictMode>
    <BrowserRouter>
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
