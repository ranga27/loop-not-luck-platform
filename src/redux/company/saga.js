import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { fetchCompanyDataFromFirestore } from '../../helpers/firestoreService';
import {
  getCompany,
  getCompanyError,
  getCompanySuccess,
  updateCompany,
} from './companySlice';

const getCompanyDataAsync = async (companyId) => {
  return fetchCompanyDataFromFirestore(companyId);
};
function* getCompanyData({ companyId }) {
  try {
    const company = yield call(getCompanyDataAsync, companyId);
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

function* updateCompanyData() {
  //
}
export function* watchUpdateCompany() {
  yield takeEvery(updateCompany, updateCompanyData);
}

export default function* rootSaga() {
  yield all([fork(watchGetCompany), fork(watchUpdateCompany)]);
}
