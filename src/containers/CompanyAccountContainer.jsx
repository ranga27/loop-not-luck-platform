/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../helpers/uploadFile';
import { updateCompany } from '../redux/company/companySlice';
import CompanyAccountForm from '../components/form/CompanyAccountForm';

const CompanyAccountContainer = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { company, loading, error } = useSelector((state) => state.company);
  const { firstName, email, companyId } = currentUser;
  const { name: companyName, logoUrl, industry } = company;
  const dispatch = useDispatch();

  const defaultValues = {
    firstName,
    companyName,
    email,
    industry,
    logoUrl,
    logoFile: null,
  };

  const onSubmit = async (data) => {
    if (!logoUrl) {
      const logoImgUrl = await uploadFile(
        data.logoFile,
        companyName,
        'companyLogos'
      );
      dispatch(
        updateCompany({
          companyId,
          logoUrl: logoImgUrl,
          industry: data.industry,
        })
      );
    } else {
      dispatch(
        updateCompany({
          companyId,
          industry: data.industry,
        })
      );
    }
  };
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && !loading && <p>{error}</p>}
      {!error && !loading && (
        <CompanyAccountForm
          defaultValues={defaultValues}
          onSubmit={(data) => onSubmit(data)}
        />
      )}
    </>
  );
};

export default CompanyAccountContainer;
