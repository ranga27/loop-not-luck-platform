/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { Component, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Row, Card, CardBody, FormGroup,
  Label, Button
} from 'reactstrap';
import {
  FormikReactSelect,
  FormikCustomCheckbox,
  FormikDatePicker,
} from './FormikFields';
import { Colxx } from '../../components/common/CustomBootstrap';
import locations from '../../data/locations';
import positionTypes from '../../data/positionTypes';

const OpportunitySchema = Yup.object().shape({
  title: Yup.string()
    .min(8, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Please enter the opportunity title'),

  organisation: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Please enter the organisation'),

  reactSelect: Yup.array()
    .min(3, 'Pick at least 3 tags')
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    ),

  location: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .required('Location is required!'),

  positionType: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .required('Position Type is required!'),

  description: Yup.string().required('Please provide the details'),

  deadline: Yup.date().nullable().required('Date required'),

});

const PostOpportunityContainer = () => {

  const onSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <h6 className="mb-4">Post an Opportunity</h6>
            <Formik
              initialValues={{
                title: '',
                organisation: '',
                location: [],
                positionType: [],
                department: '',
                description: '',
                qualification: '',
                howToApply: '',
                deadline: null,
                startDate: null,
                checkboxCoverLetter: false,
              }}
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
                      <Label>
                        Location
                      </Label>
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
                      <Label>
                        Position Type
                      </Label>
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
                      <Field
                        className="form-control"
                        name="howToApply"
                        component="textarea"
                      />
                      {errors.howToApply && touched.howToApply ? (
                        <div className="invalid-feedback d-block">
                          {errors.description}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="error-l-100">
                      <Label > Deadline
                      </Label>
                      <FormikDatePicker
                        name="deadline"
                        value={values.deadline}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.deadline && touched.deadline ? (
                        <div className="invalid-feedback d-block">
                          {errors.deadline}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="error-l-100">
                      <Label > Start Date of Role
                      </Label>
                      <FormikDatePicker
                        name="startDate"
                        value={values.startDate}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
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

                    <Button color="primary" type="submit">
                      Submit
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
export default PostOpportunityContainer;
