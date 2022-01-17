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
    updateRoleData: (state, { payload }) => {
      const { index, data } = payload;
      Object.assign(state.roles[index], data);
    },
  },
});

export const { getRoles, getRolesSuccess, getRolesError, updateRoleData } =
  rolesSlice.actions;

export default rolesSlice.reducer;
