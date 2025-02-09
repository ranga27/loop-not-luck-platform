/* eslint-disable no-unused-vars */
import { takeEvery, all, fork, call, put } from 'redux-saga/effects';
import {
  fetchRolesFromFirestore,
  unSaveRoleInFirestore,
  updateRoleInFirestore,
} from '../../helpers/firestoreService';
import {
  getRoles,
  getRolesSuccess,
  getRolesError,
  updateRole,
  unSaveRole,
} from './rolesSlice';

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

const updateRoleAsync = async (payload) => {
  return updateRoleInFirestore(payload);
};

function* updateRoleData({ payload }) {
  try {
    yield call(updateRoleAsync, payload);
  } catch (error) {
    // TODO: write updateRoleSuccess & updateRoleError
    console.log(error);
  }
}

const unSaveRoleAsync = async (payload) => {
  return unSaveRoleInFirestore(payload);
};

function* unSaveRoleData({ payload }) {
  try {
    yield call(unSaveRoleAsync, payload);
  } catch (error) {
    // TODO: write updateRoleSuccess & updateRoleError
    console.log(error);
  }
}
export function* watchGetRoles() {
  yield takeEvery(getRoles, fetchRoles);
  yield takeEvery(updateRole, updateRoleData);
  yield takeEvery(unSaveRole, unSaveRoleData);
}
export default function* rootSaga() {
  yield all([fork(watchGetRoles)]);
}
