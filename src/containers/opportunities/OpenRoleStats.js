import React, { useState, useRef } from 'react';
import {
  Row,
  Card,

  Nav,
  NavItem,
  TabContent,
  TabPane,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import SmallLineCharts from '../pages/SmallLineCharts';
import Tickets from '../pages/Tickets';

import classnames from 'classnames';
import { Colxx } from '../../components/common/CustomBootstrap';
import data from '../../data/roles';

const OpenRoleStats = () => {
  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const [roleId, setRoleId] = useState('1');

  return (
    <Row>

      <Colxx lg="5">
            <Nav pills className="flex-column">
              <NavItem>
                {data.map((role, index) => {
                  return (
                    <NavLink
                      key={`role_${index}`}
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === role.id,
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab(role.id);
                        setRoleId(role.id);
                      }}
                    >
                      {role.name}
                    </NavLink>
                  );
                })}
              </NavItem>
            </Nav>
      </Colxx>

      <Colxx>
        <TabContent activeTab={activeFirstTab}>
          <TabPane tabId={roleId}>
            <Row>
              {/* {data[roleId - 1].clicks} */}
              <Colxx lg="12" md="12">
                <SmallLineCharts itemClass="dashboard-small-chart-analytics" />
              </Colxx>
              <Colxx lg="12" md="12" className="mb-4">
                <Tickets />
              </Colxx>
            </Row>
          </TabPane>
        </TabContent>
      </Colxx>
    </Row>

  );
};

export default OpenRoleStats;
