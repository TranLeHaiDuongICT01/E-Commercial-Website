import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reducers from './reducers'
import { Provider } from 'react-redux';
import { configureStore, compose } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
const store = configureStore({
  reducer: reducers,
  applyMiddleware: compose(thunk)
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

