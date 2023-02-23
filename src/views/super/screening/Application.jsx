/* eslint-disable no-restricted-syntax */
import React from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import UserTable from './UserTable';
import IntlMessages from '../../../helpers/IntlMessages';

const Application = ({ users }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>
            <IntlMessages id="pages.application-header" />
          </h1>
          <div
            className="text-zero top-right-button-container"
            style={{
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Button previously included in the code has been removed */}
          </div>
        </Colxx>
      </Row>

      <div className="">
        <UserTable userRoles={users} />
      </div>
    </>
  );
};

export default Application;
