/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import settings from './settings/reducer';
import menu from './menu/reducer';
import auth from './auth/const ';
import roles from './roles/reducer';
import admin from './admin/reducer';
import authSlice from './auth/authSlice';

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['currentUser'],
};

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    auth: persistReducer(authConfig, auth),
    ...injectedReducers,
  });

  return rootReducer;
}
