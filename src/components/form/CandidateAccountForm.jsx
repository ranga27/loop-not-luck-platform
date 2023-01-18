import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Tooltip } from 'reactstrap';
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
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        name="firstName"
        label="First Name"
        control={control}
        errors={errors.firstName}
        data-cy="account-first-name-input"
      />
      <TextInput
        name="lastName"
        label="Last Name"
        control={control}
        errors={errors.lastName}
        data-cy="account-last-name-input"
      />
      <TextInput
        name="mobileNumber"
        label="Mobile Number"
        control={control}
        type="tel"
        errors={errors.mobileNumber}
        data-cy="account-mobile-input"
      />
      <SelectField
        label="Location"
        name="location"
        control={control}
        options={locations}
        errors={errors.location}
        dataCy="account-location-input"
      />
      <TextInput
        name="degreeSubject"
        label="Degree Subject"
        control={control}
        errors={errors.degreeSubject}
        data-cy="account-degree-input"
      />
      <DatePicker
        name="graduationYear"
        label="Graduation Year"
        control={control}
        errors={errors.graduationYear}
        showYearPicker
        dateFormat="yyyy"
        yearItemNumber={9}
        dataCy="account-graduation-year-input"
      />
      <SelectField
        name="visaRequired"
        label="Visa Sponsorship Required?"
        control={control}
        errors={errors.visaRequired}
        options={visaRequiredOptions}
        dataCy="account-visa-required-input"
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
        dataCy="account-job-values-input"
      />
      {jobValuesOther?.includes('Other') && (
        <TextInput
          name="moreJobValues"
          label="Other Job Values"
          control={control}
          errors={errors.jobValuesOther}
          data-cy="account-more-job-values-input"
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
        dataCy="account-behavior-attributes-input"
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
        dataCy="account-technical-skills-input"
      />

      {technicalSkillsOther?.includes('Other') && (
        <TextInput
          name="moreTechnicalSkills"
          label="Other Technical Skills"
          control={control}
          errors={errors.technicalSkillsOther}
          data-cy="account-more-technical-skills-input"
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
            <a href={defaultValues.cvUrl} target="_blank" rel="noreferrer">
              <i
                className="iconsminds-download bi bi-type-bold h5 bold px-2 text-primary"
                style={{
                  width: '40px',
                  fontWeight: 900,
                  WebkitTextStroke: '2px',
                }}
                id="DownloadToolTip"
              />
              <Tooltip
                placement="bottom"
                isOpen={tooltipOpen}
                target="DownloadToolTip"
                toggle={toggle}
                autohide={false}
              >
                Download CV
              </Tooltip>
            </a>
          </>
        )}
      </div>
      <TextInput
        name="email"
        label="Email"
        control={control}
        disabled
        data-cy="account-email-input"
      />
      <Button
        type="submit"
        color="primary"
        className={`btn-shadow btn-multiple-state ${
          isSubmitting ? 'show-spinner' : ''
        }`}
        size="lg"
        data-cy="account-submit-button"
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
