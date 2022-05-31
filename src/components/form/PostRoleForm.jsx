/* eslint-disable no-unused-vars */
import React from 'react';
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import { collection, query, serverTimestamp, doc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Label, Form } from 'reactstrap';
import { OpportunitySchema } from '../../constants/opportunitySchema';
import {
  CheckBox,
  DatePicker,
  MultiSelect,
  SelectField,
  TextInput,
} from './FormFields';
import { locations, applicationOptions, positionTypes } from '../../data';
import 'react-datepicker/dist/react-datepicker.css';
import { firestore } from '../../helpers/Firebase';
import rolesOfInterests from '../../data/rolesOfInterests';
import { behaviourOptions } from '../../data/behaviourOptions';
import { technicalSkills } from '../../data/technicalSkillsOptions';
import { formatDateInArray } from '../../helpers/Utils';

const PostRoleForm = () => {
  // TODO: move data operations in parent component and make this a pure component
  const mutation = useFirestoreCollectionMutation(
    collection(firestore, 'roles')
  );

  const updatedRoledMutation = useFirestoreDocumentMutation(
    doc(firestore, `config/roles`),
    { merge: true }
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
          industry: document.data().industry,
          jobValues: document.data().jobValues,
        }));
        return formatDateInArray(companiesData);
      },
    }
  );
  const defaultValues = {
    title: '',
    department: '',
    qualification: '',
    renumeration: '',
    howToApply: '',
    email: '',
    website: '',
    rolling: false,
    deadline: null,
    startDate: null,
    coverLetter: false,
    prescreening: false,
  };
  const {
    watch,
    control,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(OpportunitySchema),
  });
  const howToApply = watch('howToApply');
  const rolling = watch('rolling');
  const onSubmit = async (data) => {
    const date = { createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
    const companyData = companies.filter((x) => x.label === data.company);

    const { jobValues, industry, id } = companyData[0];
    const newPost = {
      ...data,
      ...date,
      jobValues,
      industry,
      companyId: id,
    };
    const roleLastUpdate = { lastUpdated: serverTimestamp() };
    console.log('SUBMIT: ', newPost);

    mutation.mutate(newPost);
    updatedRoledMutation.mutate(roleLastUpdate);
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
      <TextInput
        name="department"
        label="Department"
        control={control}
        errors={errors.department}
      />
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
        errors={errors.qualification}
      />
      <TextInput
        name="renumeration"
        label="Renumeration"
        control={control}
        errors={errors.renumeration}
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
      <CheckBox name="rolling" label="Rolling" control={control} />
      {!rolling && (
        <DatePicker
          label="Deadline Date"
          name="deadline"
          control={control}
          errors={errors.deadline}
        />
      )}
      <DatePicker
        label="Start Date"
        name="startDate"
        control={control}
        errors={errors.startDate}
      />
      <CheckBox
        name="coverLetter"
        label="Cover Letter Required"
        control={control}
      />
      <MultiSelect
        label="Roles of Interests"
        name="rolesOfInterests"
        control={control}
        options={rolesOfInterests}
        setValue={setValue}
        clearErrors={clearErrors}
        errors={errors.rolesOfInterests}
      />
      <MultiSelect
        label="Behaviour/Attributes/Strengths"
        name="behaviourAttributesStrengths"
        control={control}
        options={behaviourOptions}
        setValue={setValue}
        clearErrors={clearErrors}
        errors={errors.behaviourAttributesStrengths}
      />
      <MultiSelect
        label="Technical Skills"
        name="technicalSkills"
        control={control}
        options={technicalSkills}
        setValue={setValue}
        clearErrors={clearErrors}
        errors={errors.technicalSkills}
      />
      <CheckBox
        name="prescreening"
        label="Requires prescreening"
        control={control}
      />
      <Button color="primary" type="submit" disabled={mutation.isLoading}>
        Submit
      </Button>
      {mutation.isError && <p>{mutation.error.message}</p>}
    </Form>
  );
};
export default PostRoleForm;
