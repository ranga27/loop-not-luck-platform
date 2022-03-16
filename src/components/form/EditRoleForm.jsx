/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  useFirestoreCollectionMutation,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import { collection, query } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Label, Form } from 'reactstrap';
import { OpportunitySchema } from '../../constants/opportunitySchema';
import { CheckBox, DatePicker, SelectField, TextInput } from './FormFields';
import { locations, applicationOptions, positionTypes } from '../../data';
import 'react-datepicker/dist/react-datepicker.css';
import { firestore } from '../../helpers/firebase';
import formatDate from '../../containers/candidate/formatDate';
import { getDateFromString, newDate } from '../../helpers/utils';
import usePersistentContext from '../../hooks/usePersistentContext';

// Combine Post Role & Edit Role forms
const EditRoleForm = () => {
  const [role] = usePersistentContext('selectedRole');
  // TODO: move data operations in parent component and make this a pure component
  const mutation = useFirestoreCollectionMutation(
    collection(firestore, 'opportunities')
  );
  const { isLoading, data: companies } = useFirestoreQuery(
    ['companies'],
    query(collection(firestore, 'companies')),
    {
      subscribe: true,
    },
    {
      // React Query data selector
      select(snapshot) {
        const companiesData = snapshot.docs.map((document) => ({
          label: document.data().name,
          value: document.data().name,
          id: document.id,
        }));
        return formatDate(companiesData);
      },
    }
  );
  const defaultValues = {
    title: '',
    company: '',
    location: '',
    positionType: '',
    department: '',
    description: '',
    qualification: '',
    howToApply: '',
    email: '',
    website: '',
    rolling: false,
    deadline: null,
    startDate: null,
    coverLetter: false,
  };
  const {
    watch,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(OpportunitySchema),
  });
  useEffect(() => {
    try {
      if (role) {
        reset({
          title: role.title,
          company: role.company,
          location: role.location,
          positionType: role.positionType,
          department: role.department,
          description: role.description,
          qualification: role.qualification,
          howToApply: role.howToApply,
          email: role.email,
          rolling: role.rolling,
          deadline: role.deadline && getDateFromString(role.deadline),
          startDate: role.startDate && getDateFromString(role.startDate),
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [role]);
  const howToApply = watch('howToApply');
  const rolling = watch('rolling');
  const onSubmit = async (data) => {
    const date = { createdAt: newDate(), updatedAt: newDate() };
    const newPost = { ...data, ...date };
    console.log('SUBMIT: ', newPost);
    mutation.mutate(newPost);
    reset(defaultValues);
  };
  if (isLoading) {
    return <div className="loading" />;
  }
  // TODO: convert into smart form
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        name="title"
        label="Title"
        errors={errors.title}
        control={control}
      />
      <SelectField
        label="Company"
        name="company"
        control={control}
        options={companies}
        errors={errors.company}
      />
      <SelectField
        label="Location"
        name="location"
        control={control}
        options={locations}
        errors={errors.location}
      />
      <SelectField
        label="Position Type"
        name="positionType"
        control={control}
        options={positionTypes}
        errors={errors.positionType}
      />
      <TextInput name="department" label="Department" control={control} />
      <TextInput
        name="description"
        label="Description"
        errors={errors.description}
        type="textarea"
        control={control}
      />
      <TextInput
        name="qualification"
        label="Required Qualifications"
        type="textarea"
        control={control}
      />
      <SelectField
        label="How to Apply"
        name="howToApply"
        control={control}
        options={applicationOptions}
        errors={errors.howToApply}
      />
      {howToApply === 'Email to Hiring Manager' && (
        <TextInput
          name="email"
          label="Hiring Manager Email"
          control={control}
          errors={errors.email}
        />
      )}
      {howToApply === 'Apply on website' && (
        <TextInput
          name="website"
          label="Website"
          control={control}
          errors={errors.website}
        />
      )}
      <Label>Deadline</Label>
      <CheckBox
        name="rolling"
        label="Rolling"
        control={control}
        value={rolling}
      />
      {!rolling && (
        <DatePicker
          label="Deadline Date"
          name="deadline"
          control={control}
          errors={errors.deadline}
          dateFormat="dd/MM/yyyy"
        />
      )}
      <DatePicker
        label="Start Date"
        name="startDate"
        control={control}
        errors={errors.startDate}
        dateFormat="dd/MM/yyyy"
      />
      <CheckBox
        name="coverLetter"
        label="Cover Letter Required"
        control={control}
      />

      <Button color="primary" type="submit" disabled={mutation.isLoading}>
        Submit
      </Button>
      {mutation.isError && <p>{mutation.error.message}</p>}
    </Form>
  );
};
export default EditRoleForm;
