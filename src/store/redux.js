import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './user/userSlice';
import { setAuthToken } from '../axios';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

persistor.subscribe(() => {
  const { isLoggedIn, tokens } = store.getState().user;
  if (isLoggedIn) {
    setAuthToken(tokens.accessToken);
  }
});