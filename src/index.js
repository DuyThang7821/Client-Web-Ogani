import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { store, persistor } from './store/redux';
import App from './App';
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react';
import { setAuthToken } from './axios'; 

const AppWrapper = () => {
  const { isLoggedIn, tokens } = useSelector(state => state.user);
  React.useEffect(() => {
    if (isLoggedIn) {
      setAuthToken(tokens.accessToken);
    } else {
      setAuthToken(null);
    }
  }, [isLoggedIn, tokens]);

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppWrapper />
    </PersistGate>
  </Provider>
);