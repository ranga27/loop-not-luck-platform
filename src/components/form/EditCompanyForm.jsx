/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button } from 'reactstrap';
import { companySchema } from '../../constants/companySchema';
import { TextInput, MultiSelect, FileUpload, SelectField } from './FormFields';
import { interestOptions } from '../../data/interestOptions';
import { yesNoOptions } from '../../data/yesNoOptions';
import { genderOptions } from '../../data/genderOptions';
import { jobValuesOptions } from '../../data/jobValuesOptions';

// TODO: consolidate components used in add company form
const EditCompanyForm = ({ company, onSubmit }) => {
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({ defaultValues: company });
  // TODO: convert to smart form
  const genderIdentityOther = watch('genderIdentity');
  const jobValuesOther = watch('jobValues');
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

      <div className="company-img-container">
        <p>Current Logo</p>
        <img
          className="responsive d-block card-img-role"
          src={company.logoUrl}
          alt={company.companyName}
        />
      </div>

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
        options={interestOptions}
        setValue={setValue}
        errors={errors.industry}
        clearErrors={clearErrors}
        defaultValue={company.industry}
        closeMenuOnSelect={false}
      />
      <MultiSelect
        label="As a company, do you have any interest in hiring people from any of the below underrepresented groups?"
        name="genderIdentity"
        control={control}
        options={genderOptions}
        setValue={setValue}
        clearErrors={clearErrors}
        defaultValue={company.genderIdentity}
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
        clearErrors={clearErrors}
        defaultValue={company.jobValues}
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

export default EditCompanyForm;
