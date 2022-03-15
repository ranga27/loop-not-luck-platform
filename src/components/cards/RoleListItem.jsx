/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Card, CardBody, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

const RoleListItem = ({ roles, selectRole }) => {
  const [activeId, setActiveId] = useState('1');
  console.log(activeId);
  return (
    <Nav pills vertical>
      {roles.map((role) => {
        return (
          <NavItem key={role.id} className="mb-4">
            <NavLink
              to="#"
              location={{}}
              active={activeId === role.id}
              onClick={() => {
                setActiveId(role.id);
                selectRole(role);
              }}
            >
              <h6>{role.title}</h6>
            </NavLink>
          </NavItem>
        );
      })}
    </Nav>
  );
};

export default RoleListItem;
