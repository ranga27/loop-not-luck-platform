/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Card, CardBody, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

const RoleListItem = ({ roles, selectRole }) => {
  const [activeId, setActiveId] = useState('1');
  return (
    <Card>
      <CardBody>
        {roles.map((role) => {
          return (
            <Nav pills key={role.id}>
              <NavItem>
                <NavLink
                  to="#"
                  location={{}}
                  className={classnames({
                    active: activeId === role.id,
                    'nav-link': true,
                  })}
                  onClick={() => {
                    setActiveId(role.id);
                    selectRole(role);
                  }}
                >
                  <h6>{role.title}</h6>
                </NavLink>
              </NavItem>
            </Nav>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default RoleListItem;
