/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button } from 'reactstrap';
import { companySchema } from '../constants/companySchema';
import {
  TextInput,
  MultiSelect,
  FileUpload,
} from '../components/form/FormFields';
import tagOptions from '../data/tagOptions';
import { uploadFile } from '../helpers/uploadFile';
import { addCompany } from '../redux/actions';

const AddCompanyForm = () => {
  const { currentUser, loading, error } = useSelector((state) => state.auth);
  const { company, companyId, firstName, email } = currentUser;
  const defaultValues = {
    firstName,
    company,
    email,
  };
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(companySchema),
  });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const { logoFile, industry } = data;
    const logoUrl = await uploadFile(logoFile, company, 'companyLogos');
    dispatch(addCompany(logoUrl, industry));
  };
  return (
    // TODO: change the form component into smart component
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="av-tooltip tooltip-label-right"
    >
      <TextInput
        name="company"
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
      <FileUpload
        label="Logo"
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
      />
      <Button color="primary" size="lg" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddCompanyForm;
