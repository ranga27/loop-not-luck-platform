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
    updateRole: (state, { payload }) => {
      const { index, data } = payload;
      Object.assign(state.roles[index], data);
    },
    unSaveRole: (state, { payload }) => {
      const { index } = payload;
      delete state.roles[index].saved;
    },
  },
});

export const {
  getRoles,
  getRolesSuccess,
  getRolesError,
  updateRole,
  unSaveRole,
} = rolesSlice.actions;

export default rolesSlice.reducer;
