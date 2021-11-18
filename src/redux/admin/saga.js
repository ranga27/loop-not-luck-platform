import {
  all,
  call,
  put,
  takeEvery,
  fork,
  takeLeading,
} from 'redux-saga/effects';
import {
  GET_USERS_REQUESTED,
  UPDATE_ROLE,
  GET_COMPANIES_REQUESTED,
  ADD_COMPANY,
  EDIT_COMPANY,
} from '../actions';

import {
  getUsersError,
  getUsersSuccess,
  updateRoleError,
  updateRoleSuccess,
  getCompaniesSuccess,
  getCompaniesError,
  addCompanySuccess,
  addCompanyError,
  editCompanySuccess,
  editCompanyError,
} from './actions';
import {
  addCompanyToFirestore,
  fetchCompaniesFromFirestore,
} from '../../app/firestore/firestoreService';
import { getUsersList, setUserRole } from '../../app/firestore/firebaseService';

const fetchUsersAsync = async () => {
  return getUsersList;
};

function* fetchUsers() {
  try {
    const data = yield call(fetchUsersAsync);
    console.log(data);
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
  return setUserRole(uid, role);
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

const fetchCompaniesAsync = async () => {
  try {
    const companies = await fetchCompaniesFromFirestore();
    return { companies, error: null };
  } catch (error) {
    return { companies: null, error: error.message };
  }
};

function* fetchCompanies() {
  try {
    const data = yield call(fetchCompaniesAsync);
    if (data.companies != null) {
      yield put(getCompaniesSuccess(data.companies));
    } else if (data.error != null) {
      yield put(getCompaniesError(data.error));
    }
  } catch (e) {
    yield put(getCompaniesError(e.message));
    console.error(e);
  }
}

const addCompanyAsync = async (company) => {
  return addCompanyToFirestore(company);
};
function* addNewCompany({ company }) {
  try {
    if (company) {
      const { id, error } = yield call(addCompanyAsync, company);
      if (id != null) {
        yield put(addCompanySuccess({ ...company, id }));
      } else if (error != null) {
        yield put(addCompanyError(error));
      }
    } else yield put(addCompanyError('No Company Data'));
  } catch (e) {
    yield put(addCompanyError(e.message));
    console.error(e);
  }
}

function* selectCompany({ company }) {
  try {
    if (company) {
      yield put(editCompanySuccess(company));
    } else yield put(editCompanyError('Error'));
  } catch (e) {
    yield put(editCompanyError('Error'));
    console.error(e);
  }
}
export function* watchGetUsers() {
  yield takeEvery(GET_USERS_REQUESTED, fetchUsers);
}
export function* watchUpdateRole() {
  yield takeEvery(UPDATE_ROLE, updateUserRole);
}
export function* watchGetCompanies() {
  yield takeEvery(GET_COMPANIES_REQUESTED, fetchCompanies);
}
export function* watchAddCompany() {
  yield takeEvery(ADD_COMPANY, addNewCompany);
}
export function* watchEditCompany() {
  yield takeLeading(EDIT_COMPANY, selectCompany);
}
export default function* rootSaga() {
  yield all([
    fork(watchGetUsers),
    fork(watchUpdateRole),
    fork(watchGetCompanies),
    fork(watchAddCompany),
    fork(watchEditCompany),
  ]);
}
