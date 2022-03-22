import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import roleSagas from './roles/saga';

export default function* rootSaga() {
  yield all([authSagas(), roleSagas()]);
}
