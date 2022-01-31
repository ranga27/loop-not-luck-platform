/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../helpers/uploadFile';
import { updateCompany } from '../redux/company/companySlice';
import CompanyAccountForm from '../components/CompanyAccountForm';

const CompanyAccountContainer = () => {
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
    logoUrl,
  };

  const onSubmit = async (data) => {
    const { logoFile, industry } = data;
    const logoImgUrl = await uploadFile(logoFile, companyName, 'companyLogos');
    dispatch(updateCompany({ companyId, logoUrl: logoImgUrl, industry }));
  };
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && !loading && <p>{error}</p>}
      {!error && !loading && CompanyAccountForm(defaultValues, onSubmit)}
    </>
  );
};

export default CompanyAccountContainer;
