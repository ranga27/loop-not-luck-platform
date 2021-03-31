import React from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import Breadcrumb from '../../containers/navs/Breadcrumb';
import Validation from '../../containers/wizard/Validation';

const Onboarding = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.onboarding" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-5">
          <Validation />
        </Colxx>
      </Row>
    </>
  );
};

export default Onboarding;
