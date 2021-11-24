/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
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

const PostRoleForm = ({ companies }) => {
  console.log(companies);
  const defaultValues = {
    department: '',
    qualification: '',
    howToApply: '',
    email: '',
    website: '',
    rolling: true,
    deadline: null,
    startDate: null,
    coverLetter: false,
  };
  // TODO: defualt values
  const {
    watch,
    control,
    register,
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
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="av-tooltip tooltip-label-right"
    >
      <TextInput
        name="title"
        label="Title"
        register={register}
        errors={errors.title}
      />
      <SelectField
        label="Organisation"
        name="organisation"
        control={control}
        options={companies}
        errors={errors.organisation}
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
      <TextInput name="department" label="Department" register={register} />
      <TextInput
        name="description"
        label="Description"
        register={register}
        errors={errors.description}
        type="textarea"
      />
      <TextInput
        name="qualification"
        label="Required Qualifications"
        register={register}
        type="textarea"
      />
      <SelectField
        label="How to Apply"
        name="howToApply"
        control={control}
        options={applicationOptions}
      />
      {howToApply === 'Email to Hiring Manager' && (
        <TextInput
          name="email"
          label="Hiring Manager Email"
          register={register}
        />
      )}
      {howToApply === 'Apply on website' && (
        <TextInput name="website" label="Website" register={register} />
      )}
      <Label>Deadline</Label>
      <CheckBox name="rolling" label="Rolling" control={control} />
      {!rolling && (
        <DatePicker label="Deadline Date" name="deadline" control={control} />
      )}
      <DatePicker label="Start Date" name="startDate" control={control} />
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
