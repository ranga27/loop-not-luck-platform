/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import { collection, query, doc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Label, Form } from 'reactstrap';
import { OpportunitySchema } from '../../constants/opportunitySchema';
import { CheckBox, DatePicker, SelectField, TextInput } from './FormFields';
import { locations, applicationOptions, positionTypes } from '../../data';
import 'react-datepicker/dist/react-datepicker.css';
import { firestore } from '../../helpers/firebase';
import {
  formatDateInArray,
  getDateFromString,
  newDate,
} from '../../helpers/utils';
import usePersistentContext from '../../hooks/usePersistentContext';
// TODO: move data operations in parent containter and make this a pure component
// Combine Post Role & Edit Role forms
const EditRoleForm = () => {
  const [roleId, setRoleId] = useState('');
  const [role] = usePersistentContext('selectedRole');
  /*  const ref = doc(firestore, 'roles', roleId);
  const mutation = useFirestoreDocumentMutation(ref, {
    merge: true,
  }); */
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
        return formatDateInArray(companiesData);
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
    setValue,
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
        // TODO: use object.entries
        setRoleId(role.id);
        setValue('title', role.title);
        setValue('company', role.company);
        setValue('location', role.location);
        setValue('positionType', role.positionType);
        setValue('department', role.department);
        setValue('description', role.description);
        setValue('qualification', role.qualification);
        setValue('howToApply', role.howToApply);
        setValue('email', role.email);
        setValue('website', role.website);
        setValue('rolling', role.rolling);
        setValue(
          'deadline',
          role.deadline ? getDateFromString(role.deadline) : null
        );
        setValue(
          'startDate',
          role.startDate ? getDateFromString(role.startDate) : null
        );
        setValue('coverLetter', role.coverLetter);
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [role, setValue]);
  const howToApply = watch('howToApply');
  const rolling = watch('rolling');
  const onSubmit = async (data) => {
    const updatePost = { ...data, updatedAt: newDate() };
    console.log('SUBMIT: ', updatePost);
    // mutation.mutate(updatePost);
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
        checked={rolling || false}
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
        checked={watch('coverLetter')}
      />

      <Button color="primary" type="submit" /* disabled={mutation.isLoading} */>
        Submit
      </Button>
      {/* {mutation.isError && <p>{mutation.error.message} </p>} */}
    </Form>
  );
};
export default EditRoleForm;
