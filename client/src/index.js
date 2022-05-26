import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
// import store, { Persitor } from './store';
import store from './store/store';

// import { PersistGate } from 'redux-persist/integration/react'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <PersistGate loading={null} persistor={Persitor}> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* / </PersistGate> */}
  </React.StrictMode>
);

