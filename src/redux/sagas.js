import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import adminSagas from './admin/saga';
import roleSagas from './roles/saga';

export default function* rootSaga() {
  yield all([authSagas(), adminSagas(), roleSagas()]);
}
