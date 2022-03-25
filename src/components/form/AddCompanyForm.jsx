/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button, FormGroup, Label } from 'reactstrap';
import { companySchema } from '../../constants/companySchema';
import { TextInput, MultiSelect, FileUpload, SelectField } from './FormFields';
import tagOptions from '../../data/tagOptions';
import { yesNoOptions } from '../../data/yesNoOptions';
import { genderOptions } from '../../data/genderOptions';
import { jobValuesOptions } from '../../data/jobValuesOptions';
// TODO: consolidate components used in add company form
const AddCompanyForm = ({ onSubmit }) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();
  // TODO: convert to smart form
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="av-tooltip tooltip-label-right"
    >
      {/* TODO: since Company Name change is allowed, ensure that all other places like Roles have an updated name */}
      <TextInput
        name="name"
        label="Company Name"
        control={control}
        errors={errors.name}
      />
      <TextInput
        name="email"
        label="Contact Email"
        control={control}
        errors={errors.email}
      />

      <FileUpload
        label="Update Logo"
        name="logoFile"
        control={control}
        errors={errors.logoFile}
      />
      <MultiSelect
        label="Industry"
        name="industry"
        control={control}
        options={tagOptions}
        setValue={setValue}
        errors={errors.industry}
        clearErrors={clearErrors}
      />
      <MultiSelect
        label="As a company, do you have any interest in hiring people from any of the below underrepresented groups?"
        name="genderIdentity"
        control={control}
        options={genderOptions}
        setValue={setValue}
        clearErrors={clearErrors}
      />
      <MultiSelect
        label="Job Values"
        name="jobValues"
        control={control}
        options={jobValuesOptions}
        setValue={setValue}
        clearErrors={clearErrors}
      />
      <Button color="primary" size="lg" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddCompanyForm;
