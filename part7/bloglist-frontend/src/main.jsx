import ReactDOM from 'react-dom/client';
import { React, StrictMode } from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
