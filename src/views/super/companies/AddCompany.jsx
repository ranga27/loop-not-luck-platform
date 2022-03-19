/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import EditCompanyContainer from '../../../containers/EditCompanyContainer';

const EditCompany = () => {
  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <CardTitle>
              <IntlMessages id="forms.edit-company" />
            </CardTitle>
            <EditCompanyContainer />
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default EditCompany;
