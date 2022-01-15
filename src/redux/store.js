/* eslint-disable import/no-cycle */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import authReducer from './auth/authSlice';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(sagas);

export default store;
