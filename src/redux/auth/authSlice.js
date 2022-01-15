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
  },
});

export const { loginUser, loginUserSuccess, loginUserError } =
  authSlice.actions;

export default authSlice.reducer;
