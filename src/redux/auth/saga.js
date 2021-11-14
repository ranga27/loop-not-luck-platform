import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import firebase from 'firebase/app';

import { auth } from '../../helpers/Firebase';

import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  UPDATE_USER,
} from '../actions';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
  updateUserSuccess,
  updateUserError,
} from './actions';

import { adminRoot } from '../../constants/defaultValues';
import {
  fetchUserDataFromFirestore,
  updateUserInFirestore,
} from '../../app/firestore/firestoreService';
// eslint-disable-next-line import/no-cycle
import { persistor } from '../store';

const currentUser = {};

export function* watchLoginUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) =>
  // eslint-disable-next-line no-return-await
  await auth
    .signInWithEmailAndPassword(email, password)
    .then((userCred) => {
      userCred.user
        .getIdTokenResult()
        .then((idTokenResult) => {
          // TODO: Store role in a separate store object
          currentUser.role = idTokenResult.claims.role;
        })
        .catch((error) => {
          console.log(error);
        });
      return userCred;
    })
    .catch((error) => error);

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    if (!loginUser.message) {
      currentUser.uid = loginUser.user.uid;
      currentUser.email = loginUser.user.email;
      const doc = yield call(fetchUserDataFromFirestore, currentUser.uid);
      if (doc.exists) {
        currentUser.firstName = doc.data().firstName;
        currentUser.lastName = doc.data().lastName;
      }
      yield put(loginUserSuccess(currentUser));
      // HACK: routing in saga, move to login component
      history.push(adminRoot);
    } else {
      yield put(loginUserError(loginUser.message));
    }
  } catch (error) {
    console.error(error);
    yield put(loginUserError(error.message));
  }
}

export function* watchRegisterUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password, newRole) =>
  // eslint-disable-next-line no-return-await
  // TODO: separate createUser function from saga into firebaseService.js
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCred) => {
      const { uid } = userCred.user;
      const role = { role: newRole };
      const updateRoleFunction = firebase
        .functions()
        .httpsCallable('setUserRole');
      return updateRoleFunction({ uid, role });
    })
    .catch((error) => error);

function* registerWithEmailPassword({ payload }) {
  const { email, password, role } = payload.user;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      email,
      password,
      role
    );
    if (!registerUser.message) {
      auth.currentUser.sendEmailVerification();
      yield put(registerUserSuccess('success'));
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  await auth
    .signOut()
    .then((user) => user)
    .catch((error) => error);
  history.push(adminRoot);
};

function* logout({ payload }) {
  const { history } = payload;
  // setCurrentUser();
  yield call(persistor.purge);
  yield call(logoutAsync, history);
}

export function* watchForgotPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .sendPasswordResetEmail(email)
    .then((user) => user)
    .catch((error) => error);
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess('success'));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess('success'));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

function* updateUser({ payload }) {
  try {
    yield call(updateUserInFirestore, payload);
    yield put(updateUserSuccess(payload));
  } catch (error) {
    console.error(error);
    yield put(updateUserError(error.message));
  }
}
export function* watchUpdateUser() {
  yield takeEvery(UPDATE_USER, updateUser);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchUpdateUser),
  ]);
}
