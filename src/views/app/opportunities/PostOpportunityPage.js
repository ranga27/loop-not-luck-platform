import React from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import PostOpportunityContainer from '../../../containers/opportunities/PostOpportunityContainer';

const PostOpportunityPage = ({ match }) => (
  <>
    <Row>
      <Colxx xxs="12">
        <Breadcrumb heading="menu.post" match={match} />
        <Separator className="mb-5" />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="12" className="mb-4">
        <PostOpportunityContainer />
      </Colxx>
    </Row>
  </>
);
export default PostOpportunityPage;
