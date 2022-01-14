// eslint-disable-next-line import/no-cycle
import {
  GET_USERS_REQUESTED,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  UPDATE_USER_ROLE,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_ERROR,
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
  type: UPDATE_USER_ROLE,
  payload: { uid, email, role },
});
export const updateRoleSuccess = (uid, email, role) => ({
  type: UPDATE_USER_ROLE_SUCCESS,
  payload: { uid, email, role },
});
export const updateRoleError = (message) => ({
  type: UPDATE_USER_ROLE_ERROR,
  payload: message,
});
export const getCompanies = () => ({
  type: GET_COMPANIES_REQUESTED,
});
export const getCompaniesSuccess = (companies) => ({
  type: GET_COMPANIES_SUCCESS,
  payload: companies,
});
export const getCompaniesError = (message) => ({
  type: GET_COMPANIES_ERROR,
  payload: message,
});
export const addCompany = (company) => ({
  type: ADD_COMPANY,
  company,
});
export const addCompanySuccess = (company) => ({
  type: ADD_COMPANY_SUCCESS,
  payload: company,
});
export const addCompanyError = (message) => ({
  type: ADD_COMPANY_ERROR,
  payload: message,
});
export const editCompany = (company) => ({
  type: EDIT_COMPANY,
  company,
});
export const editCompanySuccess = (company) => ({
  type: EDIT_COMPANY_SUCCESS,
  payload: company,
});
export const editCompanyError = (message) => ({
  type: EDIT_COMPANY_ERROR,
  payload: message,
});
