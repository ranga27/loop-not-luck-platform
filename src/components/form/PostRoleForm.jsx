/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import Swal from 'sweetalert2';
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
import { behaviourOptions } from '../../data/behaviourOptions';
import { technicalSkills } from '../../data/technicalSkillsOptions';
import { formatDateInArray } from '../../helpers/Utils';
import { interestOptions } from '../../data/interestOptions';
import getOptions from '../../data/rolesOfInterests';
import { jobTypes } from '../../data/jobType';

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
          logoUrl: document.data().logoUrl,
          status: document.data().status,
        }));
        const findInactiveCompanies = companiesData.filter(
          (company) => company.status === false
        );

        const removeInactiveCompanies = companiesData.filter(
          (company) =>
            !findInactiveCompanies.some(
              (inactiveCompany) => company.id === inactiveCompany.id
            )
        );
        return formatDateInArray(removeInactiveCompanies);
      },
    }
  );
  const defaultValues = {
    title: '',
    department: '',
    qualification: '',
    salary: '',
    location: '',
    jobType: '',
    description: '',
    howToApply: '',
    email: '',
    website: '',
    rolling: false,
    deadline: null,
    startDate: null,
    rolesOfInterests: null,
    areaOfInterests: null,
    behaviourAttributesStrengths: null,
    technicalSkills: null,
    technicalSkillsOther: '',
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
  const rolesOfInterestCheck = watch('areaOfInterests');
  const technicalSkillsOther = watch('technicalSkills');
  const jobTypesCheck = watch('jobType');

  const areasOfInterests =
    control._formValues.areaOfInterests === undefined ||
    control._formValues.areaOfInterests === null
      ? []
      : control._formValues.areaOfInterests.map((interest) => {
          return getOptions(interest);
        });

  const selectAreaOfInterest =
    areasOfInterests === undefined ? [] : areasOfInterests.flatMap((x) => x);

  const onSubmit = async (data) => {
    const date = { createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
    const companyData = companies.filter((x) => x.label === data.company);

    const { jobValues, industry, logoUrl, id } = companyData[0];
    const newData = {
      ...data,
      ...date,
      jobValues,
      industry,
      logoUrl,
      companyId: id,
    };
    const roleLastUpdate = { lastUpdated: serverTimestamp() };
    console.log('SUBMIT: ', newData);
    mutation.mutate(newData, {
      onSuccess() {
        Swal.fire('Added!', 'New Role Added.', 'success');
        window.setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      onError() {
        Swal.fire('Oops!', 'Failed to Add Role.', 'error');
      },
      onMutate() {
        console.info('Adding document...');
      },
    });
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
        label="Job type"
        name="jobType"
        control={control}
        options={jobTypes}
        errors={errors.jobType}
      />
      {jobTypesCheck !== 'Remote' && (
        <SelectField
          label="Location"
          name="location"
          control={control}
          options={locations}
          errors={errors.location}
        />
      )}
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
        name="salary"
        label="Salary"
        control={control}
        errors={errors.salary}
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
      <MultiSelect
        label="Areas of Interests"
        name="areaOfInterests"
        control={control}
        options={interestOptions}
        errors={errors.areaOfInterests}
        setValue={setValue}
        closeMenuOnSelect={false}
        clearErrors={clearErrors}
      />
      {rolesOfInterestCheck !== null && (
        <MultiSelect
          label="Roles of Interests"
          name="rolesOfInterests"
          control={control}
          options={selectAreaOfInterest}
          errors={errors.rolesOfInterests}
          setValue={setValue}
          closeMenuOnSelect={false}
          clearErrors={clearErrors}
        />
      )}

      <MultiSelect
        label="Behaviour/Attributes/Strengths"
        name="behaviourAttributesStrengths"
        control={control}
        options={behaviourOptions}
        setValue={setValue}
        errors={errors.behaviourAttributesStrengths}
        clearErrors={clearErrors}
        closeMenuOnSelect={false}
      />
      <MultiSelect
        label="Technical Skills"
        name="technicalSkills"
        control={control}
        options={technicalSkills}
        setValue={setValue}
        clearErrors={clearErrors}
        errors={errors.technicalSkills}
        closeMenuOnSelect={false}
      />
      {technicalSkillsOther !== null &&
        technicalSkillsOther.includes('Other') && (
          <TextInput
            name="technicalSkillsOther"
            label="Other Technical Skills"
            control={control}
            errors={errors.technicalSkillsOther}
          />
        )}
      <Button color="primary" type="submit" disabled={mutation.isLoading}>
        Submit
      </Button>
      {mutation.isError && <p>{mutation.error.message}</p>}
    </Form>
  );
};
export default PostRoleForm;
