/* eslint-disable import/no-cycle */
/* eslint-disable import/no-import-module-exports */
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import rootReducer from './reducers';

// TODO: use redux-injector & react-boilerplate code
const sagaMiddleware = createSagaMiddleware();

const configureAppStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(sagaMiddleware),
  });
  sagaMiddleware.run(sagas);
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }
  return store;
};

const store = configureAppStore();

const persistor = persistStore(store);

export { store, persistor };
