/* eslint-disable no-unused-vars */
import { all } from 'redux-saga/effects';
// eslint-disable-next-line import/no-cycle
import authSagas from './auth/saga';

export default function* rootSaga(getState) {
  yield all([authSagas()]);
}
