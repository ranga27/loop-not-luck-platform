/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Label, Form } from 'reactstrap';
import { AccountSchema } from '../constants/accountSchema';
import {
  DatePicker,
  FileUpload,
  SelectField,
  TextInput,
} from './form/FormFields';
import { visaRequiredOptions } from '../containers/visaRequiredOptions';
// TODO: send data from container
const AccountForm = ({ defaultValues }) => {
  const {
    watch,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(AccountSchema) });

  const onSubmit = async (data) => console.log('SUBMIT: ', data);

  console.log(watch('firstName')); // watch input value by passing the name of it

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

      <Button color="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AccountForm;
