/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { Row, Button } from 'reactstrap';
import classnames from 'classnames';
import { fetchUserMatchedRolesFromFirestore } from '../../../helpers/firestoreService';
import { Colxx } from '../../../components/common/CustomBootstrap';
import UserTable from './UserTable';
import UserGrid from './UserGrid';
import IntlMessages from '../../../helpers/IntlMessages';

const Application = ({ users }) => {
  const [userRoles, setUsersRoles] = useState([]);
  useEffect(() => {
    fetchUserMatchedRolesFromFirestore(users).then((results) => {
      if (results.length > 0) {
        setUsersRoles(results);
      }
      return null;
    });
  }, [users]);

  const tabs = [
    { icon: 'simple-icon-list', current: true },
    { icon: ' simple-icon-grid', current: false },
  ];

  const [activeTab, setActiveTab] = useState('tab1');

  const handleTable = async () => {
    tabs[0].current = true;
    setActiveTab('tab1');
  };

  const handleGrid = async () => {
    tabs[0].current = false;
    tabs[1].current = true;
    setActiveTab('tab2');
  };
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>
            {' '}
            <IntlMessages id="pages.application-header" />
          </h1>
          <div className="text-zero top-right-button-container">
            <Button
              color="transparent"
              className={classnames('top-right-button mb-4', {
                'text-success': activeTab === 'tab1',
              })}
              onClick={(e) => handleTable(e)}
            >
              <i className="simple-icon-list h4" />
            </Button>
            <Button
              color="transparent"
              className={classnames('top-right-button mb-4', {
                'text-success': activeTab === 'tab2',
              })}
              onClick={(e) => handleGrid(e)}
            >
              <i className="simple-icon-grid h5" />
            </Button>
          </div>
        </Colxx>
      </Row>

      <div className="">
        {activeTab === 'tab1' ? (
          <UserTable userRoles={userRoles} />
        ) : (
          <UserGrid userRoles={userRoles} />
        )}
      </div>
    </>
  );
};

export default Application;
