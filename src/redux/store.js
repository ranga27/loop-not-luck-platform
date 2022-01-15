/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/no-cycle */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import authReducer from './auth/authSlice';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  auth: authReducer,
});

const configureAppStore = (preloadedState) => {
  const store = configureStore({
    reducer,
    middleware: [sagaMiddleware],
    preloadedState,
  });
  sagaMiddleware.run(sagas);
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(reducer));
  }
  return store;
};

export default configureAppStore;
