import React from 'react';
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

const Account = () => {
  return (
    <>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id="forms.account-info" />
              </CardTitle>
              <Form>
                <Label className="form-group has-float-label">
                  <Input type="email" />
                  <span>
                    <IntlMessages id="forms.email" />
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
