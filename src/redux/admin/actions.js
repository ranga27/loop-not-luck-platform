// eslint-disable-next-line import/no-cycle
import {
  GET_USERS_REQUESTED,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  UPDATE_ROLE,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_ERROR,
} from '../actions';

export const getUsers = () => ({
  type: GET_USERS_REQUESTED,
});
export const getUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: users,
});
export const getUsersError = (message) => ({
  type: GET_USERS_ERROR,
  payload: message,
});
export const updateRole = (uid, email, role) => ({
  type: UPDATE_ROLE,
  payload: { uid, email, role },
});
export const updateRoleSuccess = (uid, email, role) => ({
  type: UPDATE_ROLE_SUCCESS,
  payload: { uid, email, role },
});
export const updateRoleError = (message) => ({
  type: UPDATE_ROLE_ERROR,
  payload: message,
});
