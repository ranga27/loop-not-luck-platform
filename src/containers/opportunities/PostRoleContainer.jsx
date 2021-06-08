/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
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
import { SelectField, TextInput } from './FormFields';
import { locations, applicationOptions, positionTypes } from '../../data';

const PostRoleContainer = () => {
  const history = useHistory();
  const [modalBasic, setModalBasic] = useState(false);

  const {
    control,
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

              <SelectField
                label="Location"
                name="location"
                control={control}
                options={locations}
                errors={errors.location}
              />

              <SelectField
                label="Position Type"
                name="positionType"
                control={control}
                options={positionTypes}
                errors={errors.positionType}
              />

              <TextInput
                name="department"
                label="Department"
                register={register}
              />

              <TextInput
                name="description"
                label="Description"
                register={register}
                errors={errors.description}
                type="textarea"
              />

              <TextInput
                name="qualification"
                label="Required Qualifications"
                register={register}
                type="textarea"
              />

              <SelectField
                label="How to Apply"
                name="howToApply"
                control={control}
                options={applicationOptions}
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
