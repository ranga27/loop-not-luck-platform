/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import AccountForm from '../components/AccountForm';
import { updateUser } from '../redux/actions';
import { uploadToStorage } from '../views/app/uploadToStorage';

async function confirmOverwrite() {
  return Swal.fire({
    title: 'CV exists',
    text: 'Do you want to overwrite it with the new file?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, overwrite it!',
  });
}

const uploadFile = async (data) => {
  try {
    if (data.cv) {
      if (data.cvUploadDate) {
        const overWrite = await confirmOverwrite();
        if (overWrite.isConfirmed) {
          return await uploadToStorage(data);
        }
      } else return await uploadToStorage(data);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
  const { cv, ...rest } = data;
  return rest;
};

const AccountContainer = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.authUser);
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
  // TODO: clone objects elegantly
  const defaultValues = {
    email,
    firstName,
    lastName: lastName || '',
    mobileNumber: mobileNumber || '',
    visaRequired: visaRequired || '',
    graduationYear: graduationYear
      ? new Date(graduationYear)
      : new Date(Date.now()),
    degreeSubject: degreeSubject || '',
    cvUploadDate,
  };

  // TODO: hoist the data into state and then manipulate rather than modifying in container
  const onSubmit = async (data) => {
    console.log('SUBMIT: ', data);
    try {
      const payload = await uploadFile({ uid, ...data });
      console.log(payload);
      dispatch(updateUser(payload));
      Swal.fire('Updated!', 'Your profile has been updated.', 'success');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <AccountForm
        defaultValues={defaultValues}
        onSubmit={(data) => onSubmit(data)}
      />
    </>
  );
};

export default AccountContainer;
