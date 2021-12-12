/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AccountForm from '../components/AccountForm';

const AccountContainer = () => {
  const { loading, currentUser } = useSelector((state) => state.authUser);
  const {
    uid,
    firstName,
    lastName,
    email,
    mobileNumber,
    visaRequired,
    graduationYear,
    degreeSubject,
    cvUrl,
    cvUploadDate,
  } = currentUser;
  const defaultValues = {
    firstName,
    lastName,
    email,
    mobileNumber,
    visaRequired,
    graduationYear,
    degreeSubject,
  };
  return (
    <>
      <AccountForm defaultValues={defaultValues} onSubmit={} />
    </>
  );
};

export default AccountContainer;
