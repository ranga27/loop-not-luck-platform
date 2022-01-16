/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/no-cycle */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import authReducer from './auth/authSlice';
import menu from './menu/reducer';
import settings from './settings/reducer';
import admin from './admin/reducer';
import roles from './roles/rolesSlice';

// TODO: use redux-injector
const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  auth: authReducer,
  menu,
  roles,
  admin,
  settings,
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
