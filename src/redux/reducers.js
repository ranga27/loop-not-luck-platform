import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import opportunities from './opportunities/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  opportunities,
});

export default reducers;
