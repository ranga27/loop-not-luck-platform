import { takeEvery, all, fork, call, put } from 'redux-saga/effects';
import { fetchRolesFromFirestore } from '../../helpers/firestoreService';
import { getRoles, getRolesSuccess, getRolesError } from './rolesSlice';

const fetchRolesAsync = async (uid) => {
  try {
    const roles = await fetchRolesFromFirestore(uid);
    return { roles, error: null };
  } catch (error) {
    return { roles: null, error };
  }
};

function* fetchRoles({ payload }) {
  try {
    const data = yield call(fetchRolesAsync, payload);
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
  yield takeEvery(getRoles, fetchRoles);
}
export default function* rootSaga() {
  yield all([fork(watchGetRoles)]);
}
