import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import roleSagas from './roles/saga';
import adminSagas from './admin/saga';
import companySagas from './company/saga';

export default function* rootSaga() {
  yield all([authSagas(), adminSagas(), roleSagas(), companySagas()]);
}
