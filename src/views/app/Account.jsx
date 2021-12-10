/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Label,
  Button,
  FormGroup,
  CustomInput,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import { updateUser } from '../../redux/actions';
import { FormikReactSelect } from '../../components/form/FormikReactSelect';
import { FormikDatePicker } from '../../components/form/FormikDatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { uploadFile } from './uploadFile';

const options = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

const Account = () => {
  const dispatch = useDispatch();
  const { loading, currentUser } = useSelector((state) => state.authUser);
  const {
    uid,
    firstName,
    lastName,
    email,
    mobileNumber,
    visaRequired,
    graduationYear,
    degreeSubject,
    cvUrl,
  } = currentUser;
  const initialValues = {
    firstName,
    lastName,
    email,
    mobileNumber,
    visaRequired: options.filter((o) => o.value === visaRequired)[0],
    graduationYear: new Date(graduationYear),
    degreeSubject,
  };
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const { cv, ...rest } = values;
      const payload = {
        ...rest,
        visaRequired: rest.visaRequired.value,
      };
      if (cv) {
        if (cvUrl) {
          const result = await Swal.fire({
            title: 'CV exists',
            text: 'Do you want to overwrite it with the new file?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, overwrite it!',
          });
          if (result.isConfirmed) {
            const fileUrl = await uploadFile(cv, uid, firstName);
            if (fileUrl) payload.cvUrl = fileUrl;
            else return; // stop submitting
          }
        }
      }
      console.log(payload);
      dispatch(updateUser({ uid, ...payload }));
      setSubmitting(false);
      Swal.fire('Updated!', 'Your profile has been updated.', 'success');
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <CardTitle>
              <IntlMessages id="forms.account-info" />
            </CardTitle>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({
                setFieldValue,
                values,
                errors,
                setFieldTouched,
                isSubmitting,
              }) => (
                <Form className="av-tooltip tooltip-label-right">
                  <FormGroup className="mb-5">
                    <Label>First Name</Label>
                    <Field className="form-control" name="firstName" />
                  </FormGroup>

                  <FormGroup className="mb-5">
                    <Label>Last Name</Label>
                    <Field className="form-control" name="lastName" />
                  </FormGroup>

                  <FormGroup className="mb-5 error-l-100">
                    <Label>Mobile Number</Label>
                    <Field className="form-control" name="mobileNumber" />
                  </FormGroup>

                  <FormGroup className="error-l-100">
                    <Label>Visa Sponsorship Required?</Label>
                    <FormikReactSelect
                      name="visaRequired"
                      id="visaRequired"
                      value={values.visaRequired}
                      options={options}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.visaRequired ? (
                      <div className="invalid-feedback d-block">
                        {errors.visaRequired}
                      </div>
                    ) : null}
                  </FormGroup>

                  <FormGroup className="mb-5">
                    <Label>Graduation Year</Label>
                    <FormikDatePicker
                      className="form-control"
                      name="graduationYear"
                      value={values.graduationYear}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      showYearPicker
                      dateFormat="yyyy"
                      yearItemNumber={9}
                    />
                  </FormGroup>

                  <FormGroup className="mb-5 error-l-100">
                    <Label>Degree Subject</Label>
                    <Field className="form-control" name="degreeSubject" />
                  </FormGroup>

                  <FormGroup className="mb-5 error-l-100">
                    <Label>Upload CV (PDF files smaller than 1MB)</Label>
                    <CustomInput
                      type="file"
                      name="cv"
                      id="cv"
                      onChange={(event) => {
                        setFieldValue('cv', event.currentTarget.files[0]);
                      }}
                    />
                  </FormGroup>

                  <FormGroup className="mb-5">
                    <Label>Email</Label>
                    <Field
                      className="form-control"
                      name="email"
                      type="email"
                      disabled
                    />
                  </FormGroup>

                  <Button
                    type="submit"
                    color="primary"
                    className={`btn-shadow btn-multiple-state ${
                      isSubmitting ? 'show-spinner' : ''
                    }`}
                    size="lg"
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      <IntlMessages id="forms.submit" />
                    </span>
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

export default Account;
