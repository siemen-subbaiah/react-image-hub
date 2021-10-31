import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthState from './context/auth/AuthState';
import ImageState from './context/images/ImageState';
import ModalState from './context/modal/ModalState';

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <ModalState>
        <ImageState>
          <App />
        </ImageState>
      </ModalState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root')
);
