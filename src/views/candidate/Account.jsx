import React from 'react';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
import CandidateAccountContainer from '../../containers/CandidateAccountContainer';
import IntlMessages from '../../helpers/IntlMessages';

// TODO: Container page, components and Smart form
const Account = () => {
  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <CardTitle>
              <IntlMessages id="forms.account-info" />
            </CardTitle>
            <CandidateAccountContainer />
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Account;
