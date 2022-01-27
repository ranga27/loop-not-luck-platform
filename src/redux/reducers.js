/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/authSlice';
import menu from './menu/reducer';
import settings from './settings/reducer';
import admin from './admin/reducer';
import roles from './roles/rolesSlice';
import company from './company/companySlice';

// https://stackoverflow.com/a/35641992/14873941
const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['currentUser'],
};

const companyConfig = {
  key: 'company',
  storage,
  whitelist: ['company'],
};
const appReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  menu,
  roles,
  admin,
  company: persistReducer(companyConfig, company),
  settings,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logoutUser') {
    // for all keys defined in persistConfig(s)
    storage.removeItem('persist:auth');
    storage.removeItem('persist:company');
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
