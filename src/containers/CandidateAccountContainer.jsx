/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { useAuthUser } from '@react-query-firebase/auth';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import CandidateAccountForm from '../components/form/CandidateAccountForm';
import { auth, firestore } from '../helpers/Firebase';
import uploadFile from './uploadFile';

const allValuesSubmitted = (data) => {
  const { cv, email, ...values } = data;
  return Object.values(values).some((x) => x !== null && x !== '');
};

const CandidateAccountContainer = () => {
  const userAuth = useAuthUser(['userAuth'], auth);
  const { refetch } = useQuery(['users']);
  const navigate = useNavigate();

  const completedCollection = collection(
    firestore,
    'profiles/candidates/completed'
  );
  const completedRef = doc(completedCollection, userAuth.data.uid);
  const completedMutation = useFirestoreDocumentMutation(completedRef);

  const updatedCollection = collection(
    firestore,
    'profiles/candidates/updated'
  );
  const updatedRef = doc(updatedCollection, userAuth.data.uid);
  const updatedMutation = useFirestoreDocumentMutation(updatedRef);

  const userRef = doc(firestore, 'users', userAuth.data.uid);
  const userMutation = useFirestoreDocumentMutation(userRef, {
    merge: true,
  });
  const { isLoading, data: userDoc } = useQuery('userDoc');
  if (isLoading) {
    return <div className="loading" />;
  }

  const { uid } = userAuth.data;

  const {
    email,
    cvUrl,
    lastName,
    firstName,
    mobileNumber,
    visaRequired,
    cvUploadDate,
    degreeSubject,
    graduationYear,
    hasCompletedProfile,
    jobValues,
    behaviorAttributes,
    technicalSkills,
    moreTechnicalSkills,
    location,
    moreJobValues,
  } = userDoc;

  // TODO: clone objects elegantly
  const defaultValues = {
    email,
    firstName,
    lastName: lastName || '',
    mobileNumber: mobileNumber || '',
    visaRequired: visaRequired || '',
    graduationYear: graduationYear
      ? new Date(graduationYear.toDate().toUTCString())
      : null,
    degreeSubject: degreeSubject || '',
    cvUploadDate: cvUploadDate
      ? new Date(cvUploadDate.toDate().toUTCString())
      : null,
    jobValues: jobValues || null,
    behaviorAttributes: behaviorAttributes || null,
    technicalSkills: technicalSkills || null,
    moreTechnicalSkills: moreTechnicalSkills || '',
    moreJobValues: moreJobValues || '',
    location: location || '',
  };

  const onSubmit = async (data) => {
    // Set if completing based on server state
    const isCompleting = !hasCompletedProfile;
    console.log('SUBMITTED: ', data);
    const hasAllValues = allValuesSubmitted(data);
    try {
      const payload = await uploadFile({
        uid,
        hasCompletedProfile: hasAllValues,
        lastUpdated: serverTimestamp(),
        ...data,
        cvUrl,
      });

      // If any field is undefined than make it null since undefined is not acceptable as a value in firestore
      Object.entries(payload).forEach(([key, value]) => {
        if (value === undefined) {
          payload[key] = null;
        }
      });

      console.log('MUTATED: ', payload);

      // The payload will be null if popup will be cancelled.
      if (!payload) return;

      // TODO: only update when there is delta data to update.
      userMutation.mutate(payload, {
        onSuccess() {
          Swal.fire({
            title: 'Updated!',
            text: 'Your profile has been updated.',
            icon: 'success',
            confirmButtonColor: '#F7B919',
            iconColor: '#3085d6',
          });
          if (hasAllValues && isCompleting) {
            completedMutation.mutate({ completedAt: serverTimestamp() });
          } // TODO: Only update when the values that trigger algorithm are updated
          else {
            updatedMutation.mutate({ updatedAt: serverTimestamp() });
          }
          refetch();
          navigate('/app/roles');
        },
        onError(error) {
          console.log(error);
          Swal.fire('Oops!', 'Failed to update profile.', 'error');
        },
        onMutate() {
          console.info('Updating document...');
        },
      });

      // TODO: tell user what data has been updated.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CandidateAccountForm
      defaultValues={defaultValues}
      onSubmit={(data) => onSubmit(data)}
    />
  );
};

export default CandidateAccountContainer;
