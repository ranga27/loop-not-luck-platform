/* eslint-disable import/no-cycle */
/* eslint-disable import/no-import-module-exports */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import roles from './roles/reducer';
import admin from './admin/reducer';

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['currentUser'],
};

const adminConfig = {
  key: 'admin',
  storage,
  whitelist: ['company'],
};

const sagaMiddleware = createSagaMiddleware();
const sagaMiddlewareEnhancer = applyMiddleware(sagaMiddleware);

const rootReducer = combineReducers({
  menu,
  roles,
  settings,
  admin: persistReducer(adminConfig, admin),
  authUser: persistReducer(authConfig, authUser),
});

const store = createStore(
  rootReducer,
  composeWithDevTools(sagaMiddlewareEnhancer)
);

export const persistor = persistStore(store);

// eslint-disable-next-line import/prefer-default-export
export function configureStore() {
  sagaMiddleware.run(sagas);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
