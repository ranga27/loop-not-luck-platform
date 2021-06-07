/* eslint-disable import/named */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { createRef, useState, useEffect } from 'react';
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { OpportunitySchema } from '../../constants/opportunitySchema';
import {
  FormikReactSelect,
  FormikCustomCheckbox,
  FormikDatePicker,
} from './FormikFields';
import { Colxx } from '../../components/common/CustomBootstrap';
import { locations, applicationOptions, positionTypes } from '../../data';

import {
  updateOpportunityInFirestore,
  updateOpportunityInMobileAppFirestore,
} from '../../app/firestore/firestoreService';
import { selectOpportunityToReview } from '../../redux/actions';
import { uploadFile } from './uploadFile';

const RoleDetails = () => {
  const [modalBasic, setModalBasic] = useState(false);
  const [isEmail, setEmail] = useState(false);
  const [isWebsite, setWebsite] = useState(false);
  const [logoFile, setLogoFile] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const logoRef = createRef();
  const dispatch = useDispatch();

  const { selectedOpportunity } = useSelector((state) => state.opportunities);
  const initialValues = {
    id: selectedOpportunity.id,
    title: selectedOpportunity.title,
    organisation: selectedOpportunity.organisation,
    location: {
      label: selectedOpportunity.location,
      value: selectedOpportunity.location,
    },
    positionType: {
      label: selectedOpportunity.positionType,
      value: selectedOpportunity.positionType,
    },
    department: selectedOpportunity.department,
    description: selectedOpportunity.description,
    qualification: selectedOpportunity.qualification,
    howToApply: {
      label: selectedOpportunity.howToApply,
      value: selectedOpportunity.howToApply,
    },
    email: selectedOpportunity.email,
    website: selectedOpportunity.website,
    deadline: selectedOpportunity.deadline,
    startDate: selectedOpportunity.startDate,
    checkboxCoverLetter: selectedOpportunity.checkboxCoverLetter,
    logoUrl: selectedOpportunity.logoUrl,
  };

  const onSubmit = async (values, actions) => {
    try {
      const { location, positionType, howToApply } = values;
      setModalBasic(true);
      // TODO: currently overwrites the logofile everytime. Check if the files exits before uploading. HACK: clear form after every upload.
      const logoUrl = logoFile
        ? await uploadFile(logoFile, 'companyLogos')
        : values.logoUrl;

      const opportunity = {
        ...values,
        location: location.value,
        positionType: positionType.value,
        howToApply: howToApply.value,
        publish: true,
        logoUrl,
      };
      console.log('SUBMIT: ', opportunity);
      await updateOpportunityInFirestore(opportunity);
      await updateOpportunityInMobileAppFirestore(opportunity);
      dispatch(selectOpportunityToReview(opportunity));
      actions.resetForm(values);
      actions.setSubmitting(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
    setSelectedOption({
      label: selectedOpportunity.howToApply,
      value: selectedOpportunity.howToApply,
    });
    if (selectedOpportunity.howToApply === 'Email to Hiring Manager') {
      setEmail(true);
      setWebsite(false);
    } else {
      setEmail(false);
      setWebsite(true);
    }
  }, [selectedOpportunity]);

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
                      name="howToApply"
                      id="howToApply"
                      value={selectedOption}
                      options={applicationOptions}
                      onChange={(option) => {
                        setSelectedOption(option);
                        setFieldValue('howToApply', option);
                        if (option.value === 'Email to Hiring Manager') {
                          setEmail(true);
                          setWebsite(false);
                        } else {
                          setEmail(false);
                          setWebsite(true);
                        }
                      }}
                      onBlur={setFieldTouched}
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
            <Modal
              isOpen={modalBasic}
              toggle={() => setModalBasic(!modalBasic)}
            >
              <ModalHeader>Opportunity Edited & Published!</ModalHeader>
              <ModalBody>
                You can now review and edit other opportunities.
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => setModalBasic(false)}>
                  OK
                </Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};
export default RoleDetails;
