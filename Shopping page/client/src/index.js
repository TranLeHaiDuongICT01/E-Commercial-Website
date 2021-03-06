import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
// import store, { Persitor } from './store';
// import store from './store/store';
import reducers from './reducers'
import { configureStore, compose } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
// import { PersistGate } from 'redux-persist/integration/react'
const store = configureStore({
  reducer: reducers,
  applyMiddleware: compose(thunk)
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    {/* <PersistGate loading={null} persistor={Persitor}> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* / </PersistGate> */}
  </React.Fragment>
);

