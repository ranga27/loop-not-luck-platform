/* eslint-disable default-param-last */
import {
  LOGOUT_USER,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  SET_USER_ROLE,
  SET_AUTH_ERROR,
} from '../actions';

const INIT_STATE = {
  currentUser: '',
  forgotUserMail: '',
  newPassword: '',
  resetPasswordCode: '',
  loading: false,
  error: '',
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case FORGOT_PASSWORD:
      return { ...state, loading: true, error: '' };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        forgotUserMail: payload,
        error: '',
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        forgotUserMail: '',
        error: payload.message,
      };
    case RESET_PASSWORD:
      return { ...state, loading: true, error: '' };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        newPassword: payload,
        resetPasswordCode: '',
        error: '',
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        newPassword: '',
        resetPasswordCode: '',
        error: payload.message,
      };

    case LOGOUT_USER:
      return { ...state, currentUser: null, error: '', loading: false };
    case UPDATE_USER:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: {
          ...state.currentUser,
          ...payload,
        },
        error: '',
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: payload.message,
      };
    case SET_USER_ROLE:
      return {
        ...state,
        userRole: payload,
      };
    case SET_AUTH_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return { ...state };
  }
};
