import { takeEvery, all, fork, call, put } from 'redux-saga/effects';
import { fetchRolesFromFirestore } from '../../app/firestore/firestoreService';
import { GET_ROLES_REQUESTED } from '../actions';
import { getRolesSuccess, getRolesError } from './actions';

const fetchRolesAsync = async () => {
  try {
    const roles = await fetchRolesFromFirestore();
    return { roles, error: null };
  } catch (error) {
    return { roles: null, error };
  }
};

function* fetchRoles() {
  try {
    const data = yield call(fetchRolesAsync);
    if (data.roles !== null) {
      yield put(getRolesSuccess(data.roles));
    } else if (data.error != null) {
      yield put(getRolesError(data.error));
    }
  } catch (error) {
    yield put(getRolesError(error.message));
  }
}

export function* watchGetRoles() {
  yield takeEvery(GET_ROLES_REQUESTED, fetchRoles);
}
export default function* rootSaga() {
  yield all([fork(watchGetRoles)]);
}
