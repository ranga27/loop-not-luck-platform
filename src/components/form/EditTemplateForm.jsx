import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'reactstrap';
import { TextInput, MultiSelect } from './FormFields';
import { yesNoOptions } from '../../data/yesNoOptions';

const EditTemplateForm = ({ onSubmit, template }) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({ defaultValues: template });
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="av-tooltip tooltip-label-right"
    >
      <TextInput
        name="title"
        label="Title"
        control={control}
        errors={errors.title}
      />
      <TextInput
        name="description"
        label="Content"
        control={control}
        errors={errors.description}
        type="textarea"
        rows="5"
      />

      <MultiSelect
        label="Publish"
        name="publish"
        control={control}
        options={yesNoOptions}
        setValue={setValue}
        clearErrors={clearErrors}
        defaultValue={template.publish}
        closeMenuOnSelect={false}
      />
      <Button color="primary" size="lg" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default EditTemplateForm;
