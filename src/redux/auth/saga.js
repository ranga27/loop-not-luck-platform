/* eslint-disable no-unused-vars */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { auth } from '../../helpers/Firebase';

import {
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  UPDATE_USER,
} from '../actions';

import {
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
  updateUserSuccess,
  updateUserError,
} from './actions';
import { loginUserSuccess, loginUserError, loginUser } from './authSlice';
import { adminRoot } from '../../constants/defaultValues';
import { updateUserInFirestore } from '../../helpers/firestoreService';
// eslint-disable-next-line import/no-cycle
import {
  registerInFirebase,
  signInWithEmail,
  verifyEmail,
} from '../../helpers/firebaseService';
import { getUserError } from './getUserError';

const loginWithEmailPasswordAsync = async (user) => {
  return signInWithEmail(user);
};

function* loginWithEmailPassword({ payload }) {
  try {
    const user = yield call(loginWithEmailPasswordAsync, payload);
    if (!user.message) {
      yield put(loginUserSuccess(user));
    } else {
      yield put(loginUserError(user.message));
    }
  } catch (error) {
    console.error(error);
    yield put(loginUserError(getUserError(error.message)));
  }
}
export function* watchLoginUser() {
  yield takeEvery(loginUser, loginWithEmailPassword);
}
export function* watchRegisterUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (user) => {
  return registerInFirebase(user);
};

const verifyEmailAsync = async () => {
  return verifyEmail();
};

function* registerWithEmailPassword({ payload }) {
  try {
    const registerUser = yield call(registerWithEmailPasswordAsync, payload);
    if (!registerUser.message) {
      yield call(verifyEmailAsync);
      yield put(registerUserSuccess('success'));
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(getUserError(error.message)));
  }
}

export function* watchLogoutUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async () => {
  await auth
    .signOut()
    .then((user) => user)
    .catch((error) => error);
};

function* logout({ user }) {
  // yield call(persistor.purge);
  yield call(logoutAsync);
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
const updateUserAsync = async (user) => {
  return updateUserInFirestore(user);
};

function* updateUser({ payload }) {
  try {
    yield call(updateUserAsync, payload);
    yield put(updateUserSuccess(payload));
  } catch (error) {
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
