/* eslint-disable no-unused-vars */
import {
  all,
  call,
  put,
  takeEvery,
  fork,
  takeLatest,
} from 'redux-saga/effects';
import firebase from 'firebase/app';
import { GET_USERS_REQUESTED, UPDATE_ROLE } from '../actions';

import {
  getUsersError,
  getUsersSuccess,
  updateRoleError,
  updateRoleSuccess,
} from './actions';

const fetchUsersAsync = async () => {
  const fetchUsersFunction = firebase.functions().httpsCallable('getUsersList');
  const results = await fetchUsersFunction();
  return results.data;
};

function* fetchUsers() {
  try {
    const data = yield call(fetchUsersAsync);
    if (data.users != null) {
      yield put(getUsersSuccess(data.users));
    } else if (data.error != null) {
      yield put(getUsersError(data.error));
    }
  } catch (e) {
    yield put(getUsersError(e.message));
    console.error(e);
  }
}

const updateRoleAsync = async (uid, role) => {
  const updateRoleFunction = firebase.functions().httpsCallable('setUserRole');
  return updateRoleFunction({ uid, role });
};

function* updateUserRole({ payload }) {
  const { uid, email, role } = payload;
  try {
    const setRole = yield call(updateRoleAsync, uid, role);
    if (setRole) {
      yield put(updateRoleSuccess(uid, email, role.role));
    } else {
      yield put(updateRoleError('error'));
    }
  } catch (e) {
    yield put(updateRoleError(e.message));
    console.error(e);
  }
}
export function* watchGetUsers() {
  yield takeEvery(GET_USERS_REQUESTED, fetchUsers);
}

export function* watchUpdateRole() {
  yield takeEvery(UPDATE_ROLE, updateUserRole);
}

export default function* rootSaga() {
  yield all([fork(watchGetUsers), fork(watchUpdateRole)]);
}
