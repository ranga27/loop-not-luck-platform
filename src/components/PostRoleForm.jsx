/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Label, Form } from 'reactstrap';
import { OpportunitySchema } from '../constants/opportunitySchema';
import {
  CheckBox,
  DatePicker,
  SelectField,
  TextInput,
} from './form/FormFields';
import { locations, applicationOptions, positionTypes } from '../data';
import 'react-datepicker/dist/react-datepicker.css';

const PostRoleForm = () => {
  const { company, loading, error } = useSelector((state) => state.company);
  const { name: companyName } = company;
  const defaultValues = {
    title: '',
    department: '',
    qualification: '',
    howToApply: '',
    email: '',
    website: '',
    rolling: false,
    deadline: null,
    startDate: null,
    coverLetter: false,
    companyName,
  };
  // TODO: default values
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(OpportunitySchema),
  });
  const howToApply = watch('howToApply');
  const rolling = watch('rolling');
  const onSubmit = async (data) => {
    console.log('SUBMIT: ', data);
  };
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
      {howToApply === 'email' && (
        <TextInput
          name="email"
          label="Hiring Manager Email"
          control={control}
          errors={errors.email}
        />
      )}
      {howToApply === 'website' && (
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

      <Button color="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
export default PostRoleForm;
