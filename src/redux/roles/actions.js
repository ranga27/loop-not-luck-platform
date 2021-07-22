// eslint-disable-next-line import/no-cycle
import {
  SELECTED_ROLE,
  GET_ROLES_REQUESTED,
  GET_ROLES_SUCCESS,
  GET_ROLES_ERROR,
} from '../actions';

// eslint-disable-next-line import/prefer-default-export
export const selectedRole = (role) => ({
  type: SELECTED_ROLE,
  payload: role,
});

export const getRoles = () => ({
  type: GET_ROLES_REQUESTED,
});
export const getRolesSuccess = (roles) => ({
  type: GET_ROLES_SUCCESS,
  payload: roles,
});
export const getRolesError = (message) => ({
  type: GET_ROLES_ERROR,
  payload: message,
});
