import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  TabContent,
  TabPane,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SmallLineCharts from '../pages/SmallLineCharts';
import Tickets from '../pages/Tickets';
import { Colxx } from '../../components/common/CustomBootstrap';
import data from '../../data/roles';

const OpenRoleStats = () => {
  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const [roleId, setRoleId] = useState('1');

  return (
    <Row>
      <Colxx lg="5" md="12" className="mb-4">
        <Card>
          <CardBody>
            <div className="dashboard-list-with-user">
              <PerfectScrollbar
                options={{ suppressScrollX: true, wheelPropagation: false }}
              >
                <Nav pills className="flex-column">
                  <NavItem>
                    {data.map((role, index) => {
                      return (
                        <NavLink
                          // eslint-disable-next-line react/no-array-index-key
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
                          <h6>{role.name}</h6>
                        </NavLink>
                      );
                    })}
                  </NavItem>
                </Nav>
              </PerfectScrollbar>
            </div>
          </CardBody>
        </Card>
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
