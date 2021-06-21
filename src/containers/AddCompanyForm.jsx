/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button } from 'reactstrap';
import { CompanySchema } from '../constants/companySchema';
import { TextInput, MultiSelect, FileUpload } from '../components/FormFields';
import tagOptions from '../data/tagOptions';
import { uploadFile } from '../helpers/uploadFile';

const AddCompanyForm = () => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(CompanySchema) });
  const onSubmit = async (data) => {
    console.log('SUBMIT: ', data);
    // const logoUrl = await uploadFile(data.logoFile, data.name, 'companyLogos');
    // console.log(logoUrl);
  };
  return (
    // TODO: change the form component into smart component
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="av-tooltip tooltip-label-right"
    >
      <TextInput
        name="name"
        label="Name"
        register={register}
        errors={errors.name}
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
      />
      <Button color="primary" size="lg" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddCompanyForm;
