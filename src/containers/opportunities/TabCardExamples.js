import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import classnames from 'classnames';
import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';
import OpenRolesPage from '../../views/app/opportunities/OpenRolesPage';

const TabCardExamples = () => {
  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const [roleId, setRoleId] = useState('1');

  const data = [
    { id: "1", name: "London", info: "London is the capital city of England." },
    { id: "2", name: "Paris", info: "Paris is the capital of France." },
    { id: "3", name: "Tokyo", info: "Tokyo is the capital of Japan." }
  ];

  return (
    <Row>
      <Colxx xxs="12" xs="6" lg="3">
        <Card className="mb-4">
          <CardHeader>
            <Nav tabs className="flex-column">
              <NavItem>
                {data.map((role) => {
                  return (
                    <NavLink
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
          </CardHeader>
        </Card>
      </Colxx>

      <Colxx xxs="12" xs="6" lg="3">
        <Card className="mb-4">
          <TabContent activeTab={activeFirstTab}>
            <TabPane tabId={roleId}>
              <Row>
                <Colxx sm="12">
                  <CardBody>
                    <CardTitle className="mb-4">
                      {data[roleId - 1].info}
                    </CardTitle>
                  </CardBody>
                </Colxx>
              </Row>
            </TabPane>
          </TabContent>
        </Card>
      </Colxx>
    </Row>

  );
};

export default TabCardExamples;
