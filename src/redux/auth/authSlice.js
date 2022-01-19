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
    loginUserSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: '',
      };
    },
    loginUserError: (state, action) => {
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload,
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
} = authSlice.actions;

export default authSlice.reducer;
