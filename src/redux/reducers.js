import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import opportunities from './roles/reducer';
import admin from './admin/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  opportunities,
  admin,
});

export default reducers;
