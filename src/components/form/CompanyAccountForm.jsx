import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button } from 'reactstrap';
import { companySchema } from '../../constants/companySchema';
import { TextInput, MultiSelect, FileUpload } from './FormFields';
import tagOptions from '../../data/tagOptions';

// TODO: change the form component into smart component
const CompanyAccountForm = ({ defaultValues, onSubmit }) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues,
    resolver: yupResolver(companySchema),
  });
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="av-tooltip tooltip-label-right"
    >
      <TextInput
        name="companyName"
        label="Company Name"
        control={control}
        disabled
      />
      <TextInput
        name="email"
        label="Contact Email"
        control={control}
        disabled
      />
      {defaultValues.logoUrl ? (
        <div className="company-img-container">
          <p>Current Logo</p>
          <img
            className="responsive d-block card-img-role"
            src={defaultValues.logoUrl}
            alt={defaultValues.companyName}
          />
        </div>
      ) : (
        <FileUpload
          label="Logo"
          name="logoFile"
          control={control}
          errors={errors.logoFile}
        />
      )}
      <MultiSelect
        label="Industry"
        name="industry"
        control={control}
        options={tagOptions}
        setValue={setValue}
        errors={errors.industry}
        clearErrors={clearErrors}
        defaultValue={defaultValues.industry}
        closeMenuOnSelect={false}
      />
      <Button color="primary" size="lg" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CompanyAccountForm;
