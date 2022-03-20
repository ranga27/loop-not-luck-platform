/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button, FormGroup, Label } from 'reactstrap';
import { companySchema } from '../../constants/companySchema';
import { TextInput, MultiSelect, FileUpload } from './FormFields';
import tagOptions from '../../data/tagOptions';

// TODO: consolidate components used in add company form
const EditCompanyForm = ({ company, onSubmit }) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({ defaultValues: company });
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
        options={tagOptions}
        setValue={setValue}
        errors={errors.industry}
        clearErrors={clearErrors}
        defaultValue={company.industry}
      />
      <Button color="primary" size="lg" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default EditCompanyForm;
