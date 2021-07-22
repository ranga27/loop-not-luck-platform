import React from 'react';
import { useSelector } from 'react-redux';
import RoleDetailsCard from '../../components/cards/RoleDetailsCard';

const RoleDetailsContainer = () => {
  const { selectedRole } = useSelector((state) => state.roles);

  return <>{selectedRole && <RoleDetailsCard role={selectedRole} />}</>;
};
export default RoleDetailsContainer;
