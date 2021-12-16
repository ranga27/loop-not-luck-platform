import React from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import PostRoleContainer from '../../../containers/opportunities/PostRoleContainer';

const PostRoles = ({ match }) => (
  <>
    <Row>
      <Colxx xxs="12">
        <Breadcrumb heading="menu.post" match={match} />
        <Separator className="mb-5" />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="12" className="mb-4">
        <Card>
          <CardBody>
            <h6 className="mb-4">Post an Opportunity</h6>
            <PostRoleContainer />
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  </>
);
export default PostRoles;
