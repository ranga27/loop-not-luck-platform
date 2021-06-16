/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
  Form,
  CustomInput,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Colxx } from '../../components/common/CustomBootstrap';
import { OpportunitySchema } from '../../constants/opportunitySchema';
import {
  CheckBox,
  DatePicker,
  SelectField,
  TextInput,
} from '../../components/FormFields';
import { locations, applicationOptions, positionTypes } from '../../data';
import 'react-datepicker/dist/react-datepicker.css';
import { uploadFile } from './uploadFile';

const PostRoleContainer = () => {
  const history = useHistory();
  const [modalBasic, setModalBasic] = useState(false);
  const [logoFile, setLogoFile] = useState('');
  const handleFileSelect = (file) => {
    setLogoFile(file);
  };
  const defaultValues = {
    department: '',
    qualification: '',
    howToApply: '',
    email: '',
    website: '',
    rolling: true,
    deadline: null,
    startDate: null,
    coverLetter: false,
  };
  // TODO: defualt values
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(OpportunitySchema),
  });
  const howToApply = watch('howToApply');
  const rolling = watch('rolling');
  const onSubmit = async (data) => {
    const file = data.logoFile;
    console.log('SUBMIT: ', file);
    await uploadFile(file, 'test');
  };
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
              {howToApply === 'Email to Hiring Manager' && (
                <TextInput
                  name="email"
                  label="Hiring Manager Email"
                  register={register}
                />
              )}
              {howToApply === 'Apply on website' && (
                <TextInput name="website" label="Website" register={register} />
              )}
              <Label>Deadline</Label>
              <CheckBox name="rolling" label="Rolling" control={control} />
              {!rolling && (
                <DatePicker
                  label="Deadline Date"
                  name="deadline"
                  control={control}
                />
              )}
              <DatePicker
                label="Start Date"
                name="startDate"
                control={control}
              />
              <CheckBox
                name="coverLetter"
                label="Cover Letter Required"
                control={control}
              />

              <FormGroup>
                <Label>Upload Company Logo (120 x 120)</Label>
                <Controller
                  render={({ field: { onChange, ref } }) => (
                    <CustomInput
                      type="file"
                      id="logoFile"
                      onChange={(e) => onChange(e.target.files[0])}
                      innerRef={ref}
                    />
                  )}
                  name="logoFile"
                  control={control}
                />
              </FormGroup>

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
