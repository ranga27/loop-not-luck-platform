/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Label, Form } from 'reactstrap';
import { OpportunitySchema } from '../../constants/opportunitySchema';
import {
  CheckBox,
  DatePicker,
  SelectField,
  TextInput,
  MultiSelect,
} from './FormFields';
import { locations, applicationOptions, positionTypes } from '../../data';
import 'react-datepicker/dist/react-datepicker.css';
import rolesOfInterests from '../../data/rolesOfInterests';
import { behaviourOptions } from '../../data/behaviourOptions';
import { getDateFromString } from '../../helpers/Utils';

// Combine Post Role & Edit Role forms
const EditRoleForm = ({ companies, role, onSubmit }) => {
  const {
    setValue,
    watch,
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: role,
    resolver: yupResolver(OpportunitySchema),
  });

  const howToApply = watch('howToApply');
  const rolling = watch('rolling');
  useEffect(() => {
    try {
      if (role) {
        // TODO: use object.entries or reset
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
        setValue('rolling', role.rolling || false);
        setValue(
          'deadline',
          role.deadline ? getDateFromString(role.deadline) : null
        );
        setValue(
          'startDate',
          role.startDate ? getDateFromString(role.startDate) : null
        );
        setValue('coverLetter', role.coverLetter || false);
        setValue('prescreening', role.prescreening || false);
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [role, setValue]);
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
      <TextInput name="renumeration" label="Renumeration" control={control} />
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
        checked={rolling}
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
      <MultiSelect
        label="Roles of Interests"
        name="rolesOfInterests"
        control={control}
        options={rolesOfInterests}
        setValue={setValue}
        clearErrors={clearErrors}
        defaultValue={role.rolesOfInterests}
      />
      <MultiSelect
        label="Behaviour/Attributes/Strengths"
        name="behaviourAttributesStrengths"
        control={control}
        options={behaviourOptions}
        setValue={setValue}
        clearErrors={clearErrors}
        defaultValue={role.behaviourAttributesStrengths}
      />
      <CheckBox
        name="prescreening"
        label="Requires prescreening"
        control={control}
        checked={watch('prescreening')}
      />
      <Button color="primary" type="submit" /* disabled={mutation.isLoading} */>
        Update
      </Button>
      {/* {mutation.isError && <p>{mutation.error.message} </p>} */}
    </Form>
  );
};
export default EditRoleForm;
