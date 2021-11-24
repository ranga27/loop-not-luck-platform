/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button, FormGroup, Label } from 'reactstrap';
import { DevTool } from '@hookform/devtools';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { companySchema } from '../constants/companySchema';
import {
  TextInput,
  MultiSelect,
  FileUpload,
} from '../components/form/FormFields';
import tagOptions from '../data/tagOptions';
import { uploadFile } from '../helpers/uploadFile';
import { addCompany } from '../redux/actions';
import { ErrorModal, SuccessModal } from './CompanyModal';
import { updateCompanyInFirestore } from '../app/firestore/firestoreService';

// TODO: consolidate components used in add company form
const EditCompanyContainer = () => {
  const {
    reset,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { companies, loading, error, company } = useSelector(
    (state) => state.admin
  );
  const [modalOpenError, setModalOpenError] = useState(false);
  const [modalOpenSuccess, setModalOpenSuccess] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    /* const logoUrl = await uploadFile(
        data.logoFile,
        data.name,
        'companyLogos'
      );
      const { logoFile, ...rest } = data;
      const payload = { ...rest, logoUrl };
      dispatch(addCompany(payload)); */
    const { id } = company;
    const tags = data.tags.map((option) => option.value);
    console.log({ id, tags });
    // TODO: update firestore via saga
    updateCompanyInFirestore({ id, tags });
    setModalOpenSuccess(true);
  };

  console.log(
    useWatch({
      control,
      name: 'tags',
    })
  );
  useEffect(() => {
    let previousValues = [];
    if (company.tags !== undefined) {
      previousValues = tagOptions.filter((option) =>
        company.tags.includes(option.value)
      );
    }
    reset({
      name: company.name,
      email: company.email,
      logoFile: company.logoUrl,
      tags: previousValues,
    });
  }, [reset]);

  return (
    <>
      {!company && <p>Company Data not available, select again.</p>}
      {company && (
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="av-tooltip tooltip-label-right"
        >
          <TextInput
            name="name"
            label="Company Name"
            register={register}
            errors={errors.name}
            defaultValue={company.name}
            disabled
          />
          <TextInput
            name="email"
            label="Contact Email"
            register={register}
            errors={errors.email}
            defaultValue={company.email}
            disabled
          />
          <FormGroup className="error-l-100">
            <Label>Current Company Logo</Label>
            <br />
            <img src={company.logoUrl} alt={company.name} />
          </FormGroup>

          {/*  <FileUpload
            label="Update Logo"
            name="logoFile"
            control={control}
            errors={errors.logoFile}
          /> TODO: Move tags to component */}
          <FormGroup className="error-l-100">
            <Label>Tags</Label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Select
                  isMulti
                  options={tagOptions}
                  classNamePrefix="select"
                  {...field}
                />
              )}
            />
          </FormGroup>

          <Button color="primary" size="lg" type="submit">
            Submit
          </Button>
        </Form>
      )}
      <DevTool control={control} />
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

export default EditCompanyContainer;
