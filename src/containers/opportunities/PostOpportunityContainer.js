/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';

import Select from 'react-select';
import { toast } from 'react-toastify';
import { OpportunitySchema } from '../../constants/opportunitySchema';
import {
  FormikReactSelect,
  FormikCustomCheckbox,
  FormikDatePicker,
} from './FormikFields';
import { Colxx } from '../../components/common/CustomBootstrap';
import locations from '../../data/locations';
import positionTypes from '../../data/positionTypes';
import { addOpportunityToFirestore } from '../../app/firestore/firestoreService';
import { uploadFile } from './uploadFile';

const applicationOption = [
  { value: 'Email CV & Cover Letter', label: 'Email CV & Cover Letter' },
  { value: 'Apply on website', label: 'Apply on website' },
];

const PostOpportunityContainer = () => {
  const history = useHistory();
  const [modalBasic, setModalBasic] = useState(false);
  const [isEmail, setEmail] = useState(false);
  const [isWebsite, setWebsite] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [logoFile, setLogoFile] = useState('');
  const handleFileSelect = (file) => {
    setLogoFile(file);
  };
  const initialValues = {
    title: '',
    organisation: '',
    location: '',
    positionType: '',
    department: '',
    description: '',
    qualification: '',
    howToApply: '',
    email: '',
    website: '',
    deadline: null,
    startDate: null,
    checkboxCoverLetter: false,
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const { location, positionType } = values;
      console.log('SUBMIT: ', {
        ...values,
        location: location.value,
        positionType: positionType.value,
      });
      setModalBasic(true);
      const logoUrl = logoFile
        ? await uploadFile(logoFile, 'companyLogos')
        : null;
      await addOpportunityToFirestore({
        ...values,
        location: location.value,
        positionType: positionType.value,
        logoUrl,
      });
      setSubmitting(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setSubmitting(false);
    }
  };

  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <h6 className="mb-4">Post an Opportunity</h6>
            <Formik
              initialValues={initialValues}
              validationSchema={OpportunitySchema}
              onSubmit={onSubmit}
            >
              {({
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <Form className="av-tooltip tooltip-label-right">
                  <FormGroup className="error-l-100">
                    <Label>Title</Label>
                    <Field className="form-control" name="title" />
                    {errors.title && touched.title ? (
                      <div className="invalid-feedback d-block">
                        {errors.title}
                      </div>
                    ) : null}
                  </FormGroup>

                  <FormGroup className="error-l-100">
                    <Label>Organisation</Label>
                    <Field className="form-control" name="organisation" />
                    {errors.organisation && touched.organisation ? (
                      <div className="invalid-feedback d-block">
                        {errors.organisation}
                      </div>
                    ) : null}
                  </FormGroup>

                  <FormGroup className="error-l-100">
                    <Label>Location</Label>
                    <FormikReactSelect
                      name="location"
                      id="location"
                      value={values.location}
                      options={locations}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.location && touched.location ? (
                      <div className="invalid-feedback d-block">
                        {errors.location}
                      </div>
                    ) : null}
                  </FormGroup>

                  <FormGroup className="error-l-100">
                    <Label>Position Type</Label>
                    <FormikReactSelect
                      name="positionType"
                      id="positionType"
                      value={values.positionType}
                      options={positionTypes}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.positionType && touched.positionType ? (
                      <div className="invalid-feedback d-block">
                        {errors.positionType}
                      </div>
                    ) : null}
                  </FormGroup>

                  <FormGroup className="error-l-100">
                    <Label>Department</Label>
                    <Field className="form-control" name="department" />
                    {errors.department && touched.department ? (
                      <div className="invalid-feedback d-block">
                        {errors.department}
                      </div>
                    ) : null}
                  </FormGroup>

                  <FormGroup className="error-l-100">
                    <Label>Description</Label>
                    <Field
                      className="form-control"
                      name="description"
                      component="textarea"
                    />
                    {errors.description && touched.description ? (
                      <div className="invalid-feedback d-block">
                        {errors.description}
                      </div>
                    ) : null}
                  </FormGroup>

                  <FormGroup className="error-l-100">
                    <Label>Required Qualifications</Label>
                    <Field
                      className="form-control"
                      name="qualification"
                      component="textarea"
                    />
                    {errors.qualification && touched.qualification ? (
                      <div className="invalid-feedback d-block">
                        {errors.qualification}
                      </div>
                    ) : null}
                  </FormGroup>

                  <FormGroup className="error-l-100">
                    <Label>How to Apply</Label>
                    <Select
                      className="react-select apply"
                      classNamePrefix="react-select"
                      value={selectedOption}
                      options={applicationOption}
                      onChange={(option) => {
                        setSelectedOption(option);
                        setFieldValue('howToApply', option.value);
                        if (option.value === 'Email CV & Cover Letter') {
                          setEmail(true);
                          setWebsite(false);
                        } else {
                          setEmail(false);
                          setWebsite(true);
                        }
                      }}
                    />
                  </FormGroup>

                  <div>
                    {isEmail ? (
                      <FormGroup className="error-l-100">
                        <Label>Hiring Manager Email</Label>
                        <Field className="form-control" name="email" />
                        {errors.email && touched.email ? (
                          <div className="invalid-feedback d-block">
                            {errors.email}
                          </div>
                        ) : null}
                      </FormGroup>
                    ) : null}
                  </div>

                  <div>
                    {isWebsite ? (
                      <FormGroup className="error-l-100">
                        <Label>Website</Label>
                        <Field className="form-control" name="website" />
                        {errors.website && touched.website ? (
                          <div className="invalid-feedback d-block">
                            {errors.website}
                          </div>
                        ) : null}
                      </FormGroup>
                    ) : null}
                  </div>

                  <FormGroup className="error-l-100">
                    <Label> Deadline</Label>
                    <FormikDatePicker
                      name="deadline"
                      placeholderText="Deadline Date"
                      value={values.deadline}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      dateFormat="dd/MM/yyyy"
                    />
                    {errors.deadline && touched.deadline ? (
                      <div className="invalid-feedback d-block">
                        {errors.deadline}
                      </div>
                    ) : null}
                  </FormGroup>

                  <FormGroup className="error-l-100">
                    <Label>Start Date of Role</Label>
                    <FormikDatePicker
                      name="startDate"
                      value={values.startDate}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      placeholderText="Start Date"
                      dateFormat="dd/MM/yyyy"
                    />
                    {errors.startDate && touched.startDate ? (
                      <div className="invalid-feedback d-block">
                        {errors.startDate}
                      </div>
                    ) : null}
                  </FormGroup>

                  <FormGroup className="error-l-150">
                    <Label className="d-block">Cover Letter </Label>
                    <FormikCustomCheckbox
                      name="checkboxCoverLetter"
                      value={values.checkboxCoverLetter}
                      label="Required"
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.checkboxCoverLetter &&
                    touched.checkboxCoverLetter ? (
                      <div className="invalid-feedback d-block">
                        {errors.checkboxCoverLetter}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Label>Upload Company Logo (120 x 120)</Label>
                    <CustomInput
                      type="file"
                      name="customLogoFile"
                      id="customLogoFile"
                      onChange={(e) => handleFileSelect(e.target.files[0])}
                    />
                  </FormGroup>
                  <Button color="primary" type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>

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
export default PostOpportunityContainer;
