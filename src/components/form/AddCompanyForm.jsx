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
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({ resolver: yupResolver(companySchema) });
  // TODO: convert to smart form
  const genderIdentityOther = watch('genderIdentity');
  const jobValuesOther = watch('jobValues');
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
        closeMenuOnSelect={false}
      />
      <MultiSelect
        label="As a company, do you have any interest in hiring people from any of the below underrepresented groups?"
        name="genderIdentity"
        control={control}
        options={genderOptions}
        setValue={setValue}
        errors={errors.genderIdentity}
        clearErrors={clearErrors}
        closeMenuOnSelect={false}
      />
      {genderIdentityOther !== undefined &&
        genderIdentityOther.includes('Other') && (
          <TextInput
            name="genderIdentityOthers"
            label="Other groups"
            control={control}
            errors={errors.genderIdentityOthers}
          />
        )}
      <MultiSelect
        label="Job Values"
        name="jobValues"
        control={control}
        options={jobValuesOptions}
        setValue={setValue}
        errors={errors.jobValues}
        clearErrors={clearErrors}
        closeMenuOnSelect={false}
      />
      {jobValuesOther !== undefined && jobValuesOther.includes('Other') && (
        <TextInput
          name="jobValuesOther"
          label="Other Job Values"
          control={control}
          errors={errors.jobValuesOther}
        />
      )}
      <Button color="primary" size="lg" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddCompanyForm;
