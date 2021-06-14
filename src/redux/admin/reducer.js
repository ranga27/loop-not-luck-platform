import {
  GET_USERS_ERROR,
  GET_USERS_REQUESTED,
  GET_USERS_SUCCESS,
  UPDATE_ROLE,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_ERROR,
  GET_COMPANIES_REQUESTED,
  GET_COMPANIES_SUCCESS,
  GET_COMPANIES_ERROR,
} from '../actions';

const initialState = {
  users: [],
  companies: [],
  loading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return { ...state, loading: false, users: payload };
    case GET_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case UPDATE_ROLE:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user.uid === payload.uid ? payload : user
        ),
      };
    case UPDATE_ROLE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case GET_COMPANIES_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case GET_COMPANIES_SUCCESS:
      return { ...state, loading: false, companies: payload };
    case GET_COMPANIES_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return { ...state };
  }
};
