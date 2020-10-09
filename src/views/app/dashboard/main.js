import React from 'react';
import { Row } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import SortableStaticticsRow from '../../../containers/pages/SortableStaticticsRow';

const { messages } = '';

const Main = ({ match }) => (
  <>
    <Row>
      <Colxx xxs="12">
        <Breadcrumb heading="menu.start" match={match} />
        <Separator className="mb-5" />
      </Colxx>
    </Row>
    <SortableStaticticsRow messages={messages} />
  </>
);
export default Main;
