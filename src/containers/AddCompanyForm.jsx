/* eslint-disable no-unused-vars */
import React from 'react';
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
import { updateCompany } from '../redux/company/companySlice';

const AddCompanyForm = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { company, loading, error } = useSelector((state) => state.company);
  const { firstName, email, companyId } = currentUser;
  const { name: companyName, logoUrl } = company;
  const dispatch = useDispatch();

  const defaultValues = {
    firstName,
    companyName,
    email,
    industry: [],
  };
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

  const onSubmit = async (data) => {
    const { logoFile, industry } = data;
    const logoImgUrl = await uploadFile(logoFile, companyName, 'companyLogos');
    dispatch(updateCompany({ companyId, logoUrl: logoImgUrl, industry }));
  };
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && !loading && <p>{error}</p>}
      {!error && !loading && (
        // TODO: change the form component into smart component
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
          {logoUrl ? (
            <div>
              <p>Current Logo</p>
              <img
                className="responsive mx-auto d-block card-img-role"
                src={logoUrl}
                alt={companyName}
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
          />
          <Button color="primary" size="lg" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </>
  );
};

export default AddCompanyForm;
