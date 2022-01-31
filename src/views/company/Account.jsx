/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import CompanyAccountContainer from '../../containers/CompanyAccountContainer';

const Account = () => {
  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <CardTitle>
              <IntlMessages id="forms.add-company" />
            </CardTitle>
            <CompanyAccountContainer />
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Account;
