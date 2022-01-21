import React from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import PostRoleContainer from '../../containers/opportunities/PostRoleContainer';

const PostRole = () => (
  <>
    <Row>
      <Colxx xxs="12">
        <Separator className="mb-5" />
      </Colxx>
    </Row>
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
  </>
);
export default PostRole;
