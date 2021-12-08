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
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import Swal from 'sweetalert2';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import { updateUser } from '../../redux/actions';
import { FormikReactSelect } from '../../components/form/FormikReactSelect';
import { FormikDatePicker } from '../../components/form/FormikDatePicker';
import 'react-datepicker/dist/react-datepicker.css';

const options = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

const Account = () => {
  const storage = getStorage();

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
      const payload = {
        ...values,
        visaRequired: values.visaRequired.value,
      };
      console.log(values.cv.type);
      if (values.cv.type === 'application/pdf') {
        const storageRef = ref(storage, `cv/${uid}.pdf`);
        uploadBytes(storageRef, values.cv).then((metadata) => {
          console.log('Uploaded CV file!', storageRef.fullPath);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Only PDF files allowed',
        });
      }
      /* alert(
        JSON.stringify(
          {
            fileName: values.cv.name,
            type: values.cv.type,
            size: `${values.cv.size} bytes`,
          },
          null,
          2
        )
      ); */
      // dispatch(updateUser({ uid, ...payload }));
      setSubmitting(false);
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
              {({ setFieldValue, values, errors, setFieldTouched }) => (
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
                    <Label>Upload CV</Label>
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
                      loading ? 'show-spinner' : ''
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
