import React from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
import PostRoleContainer from '../../containers/roles/PostRoleContainer';

const PostRole = () => (
  <Row>
    <Colxx xxs="12" className="mb-4">
      <Card>
        <CardBody>
          <h6 className="mb-4">Post a Role</h6>
          <PostRoleContainer />
        </CardBody>
      </Card>
    </Colxx>
  </Row>
);
export default PostRole;
