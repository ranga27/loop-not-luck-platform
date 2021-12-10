/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AccountForm from '../components/AccountForm';

const options = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];
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
    lastName: lastName || '',
    email,
    mobileNumber: mobileNumber || '',
    visaRequired: visaRequired
      ? options.filter((o) => o.value === visaRequired)[0]
      : '',
    graduationYear: graduationYear ? new Date(graduationYear) : '',
    degreeSubject,
  };
  return (
    <>
      <AccountForm defaultValues={defaultValues} />
    </>
  );
};

export default AccountContainer;
