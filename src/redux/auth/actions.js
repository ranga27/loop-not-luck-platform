// eslint-disable-next-line import/no-cycle
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER_ERROR,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  VERIFY_EMAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  SET_USER_ROLE,
  SET_AUTH_ERROR,
} from '../actions';

export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user,
});
export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});
export const loginUserError = (message) => ({
  type: LOGIN_USER_ERROR,
  payload: { message },
});

export const forgotPassword = (forgotUserMail, history) => ({
  type: FORGOT_PASSWORD,
  payload: { forgotUserMail, history },
});
export const forgotPasswordSuccess = (forgotUserMail) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: forgotUserMail,
});
export const forgotPasswordError = (message) => ({
  type: FORGOT_PASSWORD_ERROR,
  payload: { message },
});

export const resetPassword = ({ resetPasswordCode, newPassword, history }) => ({
  type: RESET_PASSWORD,
  payload: { resetPasswordCode, newPassword, history },
});
export const resetPasswordSuccess = (newPassword) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: newPassword,
});
export const resetPasswordError = (message) => ({
  type: RESET_PASSWORD_ERROR,
  payload: { message },
});

export const registerUser = (user) => ({
  type: REGISTER_USER,
  payload: user,
});
export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});
export const registerUserError = (message) => ({
  type: REGISTER_USER_ERROR,
  payload: { message },
});

export const logoutUser = (navigate) => ({
  type: LOGOUT_USER,
  payload: navigate,
});

export const verifyEmail = (message) => ({
  type: VERIFY_EMAIL,
  payload: { message },
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserError = (message) => ({
  type: UPDATE_USER_ERROR,
  payload: { message },
});

export const setUserRole = (userRole) => ({
  type: SET_USER_ROLE,
  payload: userRole,
});
export const setAuthError = (message) => ({
  type: SET_AUTH_ERROR,
  payload: message,
});
