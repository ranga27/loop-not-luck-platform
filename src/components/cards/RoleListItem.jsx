/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import useRoleStore from '../../hooks/useRoleStore';

// TODO: investigate if roles should be queried using useQuery.
const RoleListItem = ({ roles }) => {
  const [activeId, setActiveId] = useState('1');
  const setRole = useRoleStore((state) => state.setRoleForReview);
  return (
    <Nav pills vertical>
      {roles.map((role) => {
        return (
          <NavItem key={role.id} className="nav">
            <NavLink
              className="role-list-item mb-4"
              to="#"
              location={{}}
              style={() =>
                activeId === role.id
                  ? {
                      color: '#fff',
                      background: '#922c88',
                    }
                  : { color: '#545e6f', background: '#f0f0f0' }
              }
              onClick={() => {
                setActiveId(role.id);
                setRole(role);
              }}
            >
              <h6 className="mt-2">
                {role.company} - {role.title}
              </h6>
            </NavLink>
          </NavItem>
        );
      })}
    </Nav>
  );
};

export default RoleListItem;
