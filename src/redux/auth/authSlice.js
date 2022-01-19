import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: '',
  forgotUserMail: '',
  newPassword: '',
  resetPasswordCode: '',
  loading: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state) => {
      return { ...state, loading: true, error: '' };
    },
    loginUserSuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        currentUser: payload,
        error: '',
      };
    },
    loginUserError: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: payload,
      };
    },
    logoutUser: () => {
      // Note that this should be left intentionally empty.
      // Clearing redux state and localStorage happens in rootReducer.js
    },
    registerUser: (state) => {
      return { ...state, loading: true, error: '' };
    },
    registerUserSuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        currentUser: payload,
        error: '',
      };
    },
    registerUserError: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: payload,
      };
    },
    updateUser: (state) => {
      return {
        ...state,
        loading: true,
        error: '',
      };
    },
    updateUserSuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        currentUser: {
          ...state.currentUser,
          ...payload,
        },
        error: '',
      };
    },
    updateUserError: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    },
    setAuthError: (state, { payload }) => {
      return {
        ...state,
        error: payload,
      };
    },
  },
});

export const {
  loginUser,
  loginUserSuccess,
  loginUserError,
  logoutUser,
  registerUser,
  registerUserSuccess,
  registerUserError,
  updateUser,
  updateUserSuccess,
  updateUserError,
  setAuthError,
} = authSlice.actions;

export default authSlice.reducer;
