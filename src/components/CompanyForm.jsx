/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button } from 'reactstrap';
import { companySchema } from '../constants/companySchema';
import { TextInput, MultiSelect, FileUpload } from './form/FormFields';
import tagOptions from '../data/tagOptions';
import { uploadFile } from '../helpers/uploadFile';
import { addCompany, getCompanies } from '../redux/actions';

const CompanyForm = ({ match }) => {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(companySchema) });

  return (
    // TODO: change the form component into smart component
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="av-tooltip tooltip-label-right"
    >
      <TextInput
        name="name"
        label="Company Name"
        register={register}
        errors={errors.name}
        // defaultValue={company.name}
      />
      <TextInput
        name="email"
        label="Contact Email"
        register={register}
        errors={errors.email}
      />
      <FileUpload
        label="Logo"
        name="logoFile"
        control={control}
        errors={errors.logoFile}
      />
      <MultiSelect
        label="Tags"
        name="tags"
        control={control}
        options={tagOptions}
        setValue={setValue}
        errors={errors.tags}
      />
      <Button color="primary" size="lg" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CompanyForm;
