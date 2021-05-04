import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  Label,
  Button,
  Form,
} from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import { getCurrentUser } from '../../helpers/Utils';

const Account = () => {
  const currentUser = getCurrentUser();
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const handleSubmit = () => {
    console.log('Values submitted: ', firstName);
  };
  return (
    <>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id="forms.account-info" />
              </CardTitle>
              <Form onSubmit={handleSubmit}>
                <Label className="form-group has-float-label">
                  <Input type="email" value={currentUser.email} disabled />
                  <span>
                    <IntlMessages id="forms.email" />
                  </span>
                </Label>
                <Label className="form-group has-float-label">
                  <Input type="text" />
                  <span>
                    <IntlMessages
                      id="forms.firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </span>
                </Label>
                <Label className="form-group has-float-label">
                  <Input type="text" value={currentUser.lastName} />
                  <span>
                    <IntlMessages id="forms.lastName" />
                  </span>
                </Label>
                <Button color="primary">
                  <IntlMessages id="forms.submit" />
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default Account;
