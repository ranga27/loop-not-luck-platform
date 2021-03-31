/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { createRef, useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CustomInput,
  CardImg,
} from 'reactstrap';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { OpportunitySchema } from '../../constants/opportunitySchema';
import {
  FormikReactSelect,
  FormikCustomCheckbox,
  FormikDatePicker,
} from './FormikFields';
import { Colxx } from '../../components/common/CustomBootstrap';
import locations from '../../data/locations';
import positionTypes from '../../data/positionTypes';
import {
  updateOpportunityToFirestore,
  updateOpportunityToMobileAppFirestore,
} from '../../app/firestore/firestoreService';
import { selectOpportunityToReview } from '../../redux/actions';
import { uploadFile } from './uploadFile';

const applicationOption = [
  { label: 'Email CV & Cover Letter', value: 'email' },
  { label: 'Apply on website', value: 'website' },
];

const RoleDetails = () => {
  const [isEmail, setEmail] = useState(false);
  const [isWebsite, setWebsite] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [logoFile, setLogoFile] = useState('');
  const logoRef = createRef();
  const dispatch = useDispatch();

  const { selectedOpportunity } = useSelector((state) => state.opportunities);

  const initialValues = {
    id: selectedOpportunity.id,
    title: selectedOpportunity.title,
    organisation: selectedOpportunity.organisation,
    location: selectedOpportunity.location,
    positionType: selectedOpportunity.positionType,
    department: selectedOpportunity.department,
    description: selectedOpportunity.description,
    qualification: selectedOpportunity.qualification,
    howToApply: selectedOpportunity.howToApply,
    email: selectedOpportunity.email,
    website: selectedOpportunity.website,
    deadline: selectedOpportunity.deadline,
    startDate: selectedOpportunity.startDate,
    checkboxCoverLetter: selectedOpportunity.checkboxCoverLetter,
    logoUrl: selectedOpportunity.logoUrl,
  };

  const onSubmit = async (values, actions) => {
    try {
      const logoUrl = logoFile
        ? await uploadFile(logoFile, 'companyLogos')
        : values.logoUrl;

      const opportunity = { ...values, publish: true, logoUrl };
      await updateOpportunityToFirestore(opportunity);
      await updateOpportunityToMobileAppFirestore(opportunity);
      dispatch(selectOpportunityToReview(opportunity));
      actions.setSubmitting(false);
    } catch (error) {
      toast.error(error.message);
      actions.setSubmitting(false);
    }
  };

  const showInput = (option) => {
    setSelectedOption(option);
    if (option.value === 'email') {
      setEmail(true);
      setWebsite(false);
    } else {
      setEmail(false);
      setWebsite(true);
    }
  };

  const handleFileSelect = (file) => {
    setLogoFile(file);
  };

  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <h6 className="mb-4">Review and Publish Opportunity</h6>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={OpportunitySchema}
              onSubmit={(values, actions) => onSubmit(values, actions)}
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
                      onChange={showInput}
                    />
                  </FormGroup>

                  <div>
                    {isEmail ? (
                      <FormGroup className="error-l-100">
                        <Label>Email</Label>
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
                    <Label> Start Date of Role</Label>
                    <FormikDatePicker
                      name="startDate"
                      value={values.startDate}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
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
                    <Card className="mb-4">
                      <div className="position-relative">
                        <Label>Company Logo</Label>
                        <CardImg top src={values.logoUrl} alt=" " />
                      </div>
                    </Card>
                    <Label>Update Company Logo</Label>
                    <CustomInput
                      type="file"
                      name="customLogoFile"
                      id="customLogoFile"
                      label=""
                      value={values.customLogoFile}
                      onChange={(e) => handleFileSelect(e.target.files[0])}
                      ref={logoRef}
                    />
                  </FormGroup>

                  <Button color="primary" type="submit">
                    Publish
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};
export default RoleDetails;
