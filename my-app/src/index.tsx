import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Container/App';

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap-icons/font/bootstrap-icons.json"

import { BrowserRouter } from 'react-router-dom';
import store from './Storage/Redux/store';
import { Provider } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TimerProvider } from './Components/Layout/Page/Lekovi/Common/TimerProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <TimerProvider>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />

        <App />

      </BrowserRouter>
    </Provider>
  </TimerProvider>
);
