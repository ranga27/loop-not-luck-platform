/* eslint-disable default-param-last */
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
  ADD_COMPANY,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_ERROR,
  EDIT_COMPANY,
  EDIT_COMPANY_SUCCESS,
  EDIT_COMPANY_ERROR,
} from '../actions';

const initialState = {
  users: [],
  companies: [],
  loading: false,
  error: null,
  company: null,
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
    case ADD_COMPANY:
      return { ...state, loading: true };
    case ADD_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        companies: [...state.companies, payload],
      };
    case ADD_COMPANY_ERROR:
      return { ...state, loading: false, error: payload };
    case EDIT_COMPANY:
      return { ...state, loading: true };
    case EDIT_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        company: payload,
      };
    case EDIT_COMPANY_ERROR:
      return { ...state, loading: false, error: payload };
    default:
      return { ...state };
  }
};
