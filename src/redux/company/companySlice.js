import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  company: '',
  laoding: false,
  error: '',
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    getCompany: (state) => {
      return { ...state, loading: true, error: '' };
    },
    getCompanySuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        company: payload,
        error: '',
      };
    },
    getCompanyError: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        company: null,
        error: payload,
      };
    },
    updateCompany: (state) => {
      return {
        ...state,
        loading: true,
        error: '',
      };
    },
    updateCompanySuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        company: {
          ...state.company,
          ...payload,
        },
        error: '',
      };
    },
    updateCompanyError: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    },
  },
});

export const {
  getCompany,
  getCompanySuccess,
  getCompanyError,
  updateCompany,
  updateCompanySuccess,
  updateCompanyError,
} = companySlice.actions;

export default companySlice.reducer;
