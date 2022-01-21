import React from 'react';
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
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="av-tooltip tooltip-label-right"
    >
      <TextInput
        name="title"
        label="Title"
        errors={errors.title}
        control={control}
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
      />
      {howToApply === 'Email to Hiring Manager' && (
        <TextInput
          name="email"
          label="Hiring Manager Email"
          control={control}
        />
      )}
      {howToApply === 'Apply on website' && (
        <TextInput name="website" label="Website" control={control} />
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
