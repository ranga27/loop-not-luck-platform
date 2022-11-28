import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'reactstrap';
import { AccountSchema } from '../../constants/accountSchema';
import {
  DatePicker,
  FileUpload,
  SelectField,
  TextInput,
  MultiSelect,
} from './FormFields';
import { locations } from '../../data';
import { visaRequiredOptions } from '../../data/visaRequiredOptions';
import IntlMessages from '../../helpers/IntlMessages';
import { jobValuesOptions } from '../../data/jobValuesOptions';
import { behaviourOptions } from '../../data/behaviourOptions';
import { technicalSkills } from '../../data/technicalSkillsOptions';

const CandidateAccountForm = ({ defaultValues, onSubmit }) => {
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm({
    defaultValues,
    resolver: yupResolver(AccountSchema),
  });
  // TODO: convert into smart form
  const technicalSkillsOther = watch('technicalSkills');
  const jobValuesOther = watch('jobValues');

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        name="firstName"
        label="First Name"
        control={control}
        errors={errors.firstName}
      />
      <TextInput
        name="lastName"
        label="Last Name"
        control={control}
        errors={errors.lastName}
      />
      <TextInput
        name="mobileNumber"
        label="Mobile Number"
        control={control}
        type="tel"
        errors={errors.mobileNumber}
      />
      <SelectField
        label="Location"
        name="location"
        control={control}
        options={locations}
        errors={errors.location}
      />
      <TextInput
        name="degreeSubject"
        label="Degree Subject"
        control={control}
        errors={errors.degreeSubject}
      />
      <DatePicker
        name="graduationYear"
        label="Graduation Year"
        control={control}
        errors={errors.graduationYear}
        showYearPicker
        dateFormat="yyyy"
        yearItemNumber={9}
      />
      <SelectField
        name="visaRequired"
        label="Visa Sponsorship Required?"
        control={control}
        errors={errors.visaRequired}
        options={visaRequiredOptions}
      />
      {/* eslint no-underscore-dangle: 0 */}
      <MultiSelect
        label="What 3 things are most important to you in a new position?"
        name="jobValues"
        control={control}
        options={jobValuesOptions}
        setValue={setValue}
        clearErrors={clearErrors}
        defaultValue={defaultValues.jobValues}
        isOptionDisabled={() =>
          control._formValues.jobValues !== null &&
          control._formValues.jobValues.length >= 3
        }
        closeMenuOnSelect={false}
        errors={errors.jobValues}
      />
      {jobValuesOther?.includes('Other') && (
        <TextInput
          name="moreJobValues"
          label="Other Job Values"
          control={control}
          errors={errors.jobValuesOther}
        />
      )}
      <MultiSelect
        label="What are your top 3 Behaviours/Attributes/Strengths?"
        name="behaviorAttributes"
        control={control}
        options={behaviourOptions}
        setValue={setValue}
        clearErrors={clearErrors}
        errors={errors.behaviorAttributes}
        defaultValue={defaultValues.behaviorAttributes}
        isOptionDisabled={() =>
          control._formValues.behaviorAttributes !== null &&
          control._formValues.behaviorAttributes.length >= 3
        }
        closeMenuOnSelect={false}
      />
      <MultiSelect
        label="Technical Skills"
        name="technicalSkills"
        control={control}
        options={technicalSkills}
        setValue={setValue}
        clearErrors={clearErrors}
        defaultValue={defaultValues.technicalSkills}
        closeMenuOnSelect={false}
        errors={errors.technicalSkills}
      />

      {technicalSkillsOther?.includes('Other') && (
        <TextInput
          name="moreTechnicalSkills"
          label="Other Technical Skills"
          control={control}
          errors={errors.technicalSkillsOther}
        />
      )}

      <FileUpload
        label="Upload CV (PDF file smaller than 1MB)"
        name="cv"
        control={control}
        errors={errors.cv}
      />
      <div className="d-flex flex-row">
        {defaultValues.cvUploadDate && (
          <>
            <p className="p-1" style={{ fontWeight: 'bold' }}>
              CV Exists, uploaded on{' '}
              {new Date(defaultValues.cvUploadDate).toUTCString()}
            </p>
            <i
              className="iconsminds-information h4 px-2 text-primary"
              style={{ width: '40px', fontWeight: 'bold' }}
              id="TooltipExample"
            />
          </>
        )}
      </div>
      <TextInput name="email" label="Email" control={control} disabled />
      <Button
        type="submit"
        color="primary"
        className={`btn-shadow btn-multiple-state ${
          isSubmitting ? 'show-spinner' : ''
        }`}
        size="lg"
      >
        <span className="spinner d-inline-block">
          <span className="bounce1" />
          <span className="bounce2" />
          <span className="bounce3" />
        </span>
        <span className="label">
          <IntlMessages id="forms.submit" />
        </span>
      </Button>
    </Form>
  );
};

export default CandidateAccountForm;
