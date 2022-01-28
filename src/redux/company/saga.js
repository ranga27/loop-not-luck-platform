/* eslint-disable no-unused-vars */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  fetchCompanyDataFromFirestore,
  updateCompanyInFirebase,
} from '../../helpers/firestoreService';
import {
  getCompany,
  getCompanyError,
  getCompanySuccess,
  updateCompany,
  updateCompanyError,
  updateCompanySuccess,
} from './companySlice';

const getCompanyDataAsync = async (companyId) => {
  return fetchCompanyDataFromFirestore(companyId);
};
function* getCompanyData({ payload }) {
  try {
    const company = yield call(getCompanyDataAsync, payload);
    if (!company.message) {
      yield put(getCompanySuccess(company));
    } else {
      yield put(getCompanyError(company.message));
    }
  } catch (error) {
    console.error(error);
    yield put(getCompanyError(error.message));
  }
}

export function* watchGetCompany() {
  yield takeEvery(getCompany, getCompanyData);
}
const updateCompanyDataAsync = async (data) => {
  return updateCompanyInFirebase(data);
};

function* updateCompanyData({ payload }) {
  try {
    const company = yield call(updateCompanyDataAsync, payload);
    if (!company.message) {
      const { companyId, ...data } = payload;
      yield put(updateCompanySuccess({ ...data }));
    } else {
      yield put(updateCompanyError(company.message));
    }
  } catch (error) {
    console.error(error);
    yield put(updateCompanyError(error.message));
  }
}
export function* watchUpdateCompany() {
  yield takeEvery(updateCompany, updateCompanyData);
}

export default function* rootSaga() {
  yield all([fork(watchGetCompany), fork(watchUpdateCompany)]);
}
