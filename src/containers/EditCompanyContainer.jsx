/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button, FormGroup, Card, Label, CardImg } from 'reactstrap';
import { companySchema } from '../constants/companySchema';
import { TextInput, MultiSelect, FileUpload } from '../components/FormFields';
import tagOptions from '../data/tagOptions';
import { uploadFile } from '../helpers/uploadFile';
import { addCompany, getCompanies } from '../redux/actions';
import { ErrorModal, SuccessModal } from './CompanyModal';

// TODO: consolidate components used in add company form
const EditCompanyContainer = () => {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(companySchema),
  });
  const { companies, loading, error, company } = useSelector(
    (state) => state.admin
  );
  const [modalOpenError, setModalOpenError] = useState(false);
  const [modalOpenSuccess, setModalOpenSuccess] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    if (companies.some((c) => c.name === data.name)) {
      setModalOpenError(true);
    } else {
      const logoUrl = await uploadFile(
        data.logoFile,
        data.name,
        'companyLogos'
      );
      const { logoFile, ...rest } = data;
      const payload = { ...rest, logoUrl };
      dispatch(addCompany(payload));
      setModalOpenSuccess(true);
    }
  };
  const selectedValues = tagOptions.filter((option) =>
    company.tags.includes(option.value)
  );
  useEffect =
    (() => {
      setValue('tags', selectedValues);
    },
    []);
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
          />
          <TextInput
            name="email"
            label="Contact Email"
            register={register}
            errors={errors.email}
            defaultValue={company.email}
          />
          <FormGroup className="error-l-100">
            <Label>Current Company Logo</Label>
            <br />
            <img src={company.logoUrl} alt={company.name} />
          </FormGroup>

          <FileUpload
            label="Update Logo"
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
            selected={company.tags}
          />
          <Button color="primary" size="lg" type="submit">
            Submit
          </Button>
        </Form>
      )}

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
