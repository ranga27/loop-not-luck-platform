import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'reactstrap';
import { AccountSchema } from '../constants/accountSchema';
import {
  DatePicker,
  FileUpload,
  SelectField,
  TextInput,
} from './form/FormFields';
import { visaRequiredOptions } from '../containers/visaRequiredOptions';
import IntlMessages from '../helpers/IntlMessages';

const AccountForm = ({ defaultValues, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(AccountSchema),
  });

  // TODO: convert into smart form
  return (
    /* "handleSubmit" will validate inputs before invoking "onSubmit" */
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="av-tooltip tooltip-label-right"
    >
      <TextInput
        name="firstName"
        label="First Name"
        control={control}
        errors={errors.firstName}
      />
      <TextInput
        name="lastName"
        label="Last Name"
        control={control}
        errors={errors.lastName}
      />
      <TextInput
        name="mobileNumber"
        label="Mobile Number"
        control={control}
        errors={errors.mobileNumber}
      />
      <SelectField
        name="visaRequired"
        label="Visa Sponsorship Required?"
        control={control}
        errors={errors.visaRequired}
        options={visaRequiredOptions}
      />
      <DatePicker
        name="graduationYear"
        label="Graduation Year"
        control={control}
        errors={errors.graduationYear}
        showYearPicker
        dateFormat="yyyy"
        yearItemNumber={9}
      />
      <TextInput
        name="degreeSubject"
        label="Degree Subject"
        control={control}
        errors={errors.degreeSubject}
      />
      <FileUpload
        label="Upload CV (PDF files smaller than 1MB)"
        name="cv"
        control={control}
        errors={errors.cv}
      />
      <TextInput name="email" label="Email" control={control} disabled />
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
  );
};

export default AccountForm;
