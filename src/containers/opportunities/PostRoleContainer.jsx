/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Row,
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Form,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Colxx } from '../../components/common/CustomBootstrap';
import { OpportunitySchema } from '../../constants/opportunitySchema';
import { TextInput } from './FormFields';

const PostRoleContainer = () => {
  const history = useHistory();
  const [modalBasic, setModalBasic] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(OpportunitySchema),
  });
  const onSubmit = (data) => console.log(data);
  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <h6 className="mb-4">Post an Opportunity</h6>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="av-tooltip tooltip-label-right"
            >
              <TextInput
                name="title"
                label="Title"
                register={register}
                errors={errors.title}
              />
              <TextInput
                name="organisation"
                label="Organisation"
                register={register}
                errors={errors.organisation}
              />
              <TextInput
                name="department"
                label="Department"
                register={register}
              />
              <Button color="primary" type="submit">
                Submit
              </Button>
            </Form>
            <Modal
              isOpen={modalBasic}
              toggle={() => setModalBasic(!modalBasic)}
            >
              <ModalHeader>Opportunity Saved!</ModalHeader>
              <ModalBody>
                Please head over to the Review tab to verify the details and to
                publish.
              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  onClick={() => history.push('/app/opportunities/review')}
                >
                  Go To Review
                </Button>
                <Button color="secondary" onClick={() => setModalBasic(false)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};
export default PostRoleContainer;
