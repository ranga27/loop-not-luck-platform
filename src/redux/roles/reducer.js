/* eslint-disable default-param-last */
import {
  SELECTED_ROLE,
  GET_ROLES_REQUESTED,
  GET_ROLES_SUCCESS,
  GET_ROLES_ERROR,
} from '../actions';

const INIT_STATE = {
  roles: [],
  selectedRole: null,
  loading: false,
  error: null,
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case SELECTED_ROLE:
      return { ...state, selectedRole: payload };
    case GET_ROLES_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case GET_ROLES_SUCCESS:
      return { ...state, loading: false, roles: payload };
    case GET_ROLES_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return { ...state };
  }
};
