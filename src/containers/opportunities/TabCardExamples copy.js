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

const TabCardExamples = () => {
  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const data = [
    { id: "1", name: "London", info: "London is the capital city of England." },
    { id: "2", name: "Paris", info: "Paris is the capital of France." },
    { id: "3", name: "Tokyo", info: "Tokyo is the capital of Japan." }
  ];

  return (
    <Row>
      <Colxx xxs="12">
        <Row>
          <Colxx xxs="12" xs="6" lg="3">
            <Card className="mb-4">
              <CardHeader>
                <Nav tabs className="flex-column">
                  <NavItem>
                    <NavLink
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === '1',
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab('1');
                      }}
                    >
                      Role 1
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === '2',
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab('2');
                      }}
                    >
                      Role 2
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === '3',
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab('3');
                      }}
                    >
                      Role 3
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardHeader>
            </Card>
          </Colxx>

          <Colxx xxs="12" xs="6" lg="3">
            <Card className="mb-4">
              <TabContent activeTab={activeFirstTab}>
                <TabPane tabId="1">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                        <CardTitle className="mb-4">
                          Internship
                        </CardTitle>
                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                        <CardTitle className="mb-4">
                          Graduate
                        </CardTitle>
                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                        <CardTitle className="mb-4">
                          Summer Placement
                        </CardTitle>
                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
              </TabContent>
            </Card>
          </Colxx>
        </Row>
      </Colxx>



      <Colxx xxs="12">
        <Row>
          {data.map((role) => {
            if (true) {
              return (
<>
              <Colxx xxs="12" xs="6" lg="3">
                <Card className="mb-4">
                  <CardHeader>
                    <Nav tabs className="flex-column">
                      <NavItem>
                        <NavLink
                          to="#"
                          location={{}}
                          className={classnames({
                            active: activeFirstTab === role.id,
                            'nav-link': true,
                          })}
                          onClick={() => {
                            setActiveFirstTab(role.id);
                          }}
                        >
                          {role.name}
                    </NavLink>
                      </NavItem>
                    </Nav>
                  </CardHeader>
                </Card>
              </Colxx>
              <Colxx xxs="12" xs="6" lg="3">
                <Card className="mb-4">
                  <TabContent activeTab={activeFirstTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Colxx sm="12">
                          <CardBody>
                            <CardTitle className="mb-4">
                              {role.info}
                        </CardTitle>
                          </CardBody>
                        </Colxx>
                      </Row>
                    </TabPane>
                  </TabContent>
                </Card>
              </Colxx>
              </>
              );}
          })}

        </Row>
      </Colxx>



    </Row>

  );
};

export default TabCardExamples;
