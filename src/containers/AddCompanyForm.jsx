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
import { addCompany, getCompanies } from '../redux/actions';
import { ErrorModal, SuccessModal } from './CompanyModal';

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

  const [modalOpenError, setModalOpenError] = useState(false);
  const [modalOpenSuccess, setModalOpenSuccess] = useState(false);

  const dispatch = useDispatch();

  // TODO: add observer & listener for fetching company data, rather than reading data on mount.
  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  const onSubmit = async (data) => {
    const logoUrl = await uploadFile(data.logoFile, data.name, 'companyLogos');
    const { logoFile, ...companyData } = data;
    const payload = { ...companyData, logoUrl };
    dispatch(addCompany(payload));
    setModalOpenSuccess(true);
  };
  return (
    // TODO: change the form component into smart component
    <>
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
      <ErrorModal
        toggleModal={() => setModalOpenError(!modalOpenError)}
        modalOpen={modalOpenError}
      />
      <SuccessModal
        toggleModal={() => setModalOpenSuccess(!modalOpenSuccess)}
        modalOpen={modalOpenSuccess}
      />
    </>
  );
};

export default AddCompanyForm;
