/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [],
  loading: false,
  error: null,
};

export const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    getRoles: (state) => {
      return { ...state, loading: true };
    },
    getRolesSuccess: (state, action) => {
      return { ...state, loading: false, roles: action.payload };
    },
    getRolesError: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    updateRoleApplied: (state, action) => {
      state.roles[action.payload].applied = true;
    },
  },
});

export const { getRoles, getRolesSuccess, getRolesError, updateRoleApplied } =
  rolesSlice.actions;

export default rolesSlice.reducer;
