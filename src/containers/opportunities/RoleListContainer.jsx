/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoles, selectedRole } from '../../redux/actions';
import RoleListItem from '../../components/cards/RoleListItem';

const RoleListContainer = () => {
  const { roles } = useSelector((state) => state.roles);
  const dispatch = useDispatch();
  const selectRole = (role) => {
    // TODO: Use better name for selectedRole
    dispatch(selectedRole(role));
  };
  useEffect(() => {
    const fetchRoles = async () => {
      // TODO: avoid multiple firestore reads, keep role list updated via listener
      dispatch(getRoles());
    };
    fetchRoles();
  }, [dispatch]);
  return <RoleListItem roles={roles} selectRole={selectRole} />;
};

export default RoleListContainer;
