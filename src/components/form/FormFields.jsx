/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import { FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';

// TODO: create a smart component passing individual components as children to form

const Group = ({ label, errors, children }) => {
  return (
    <FormGroup className="error-l-100 has-float-label  mb-5">
      <Label>{label}</Label>
      {children}
      {errors && (
        <div className="invalid-feedback d-block">{errors.message}</div>
      )}
    </FormGroup>
  );
};

export const MultiSelect = ({
  label,
  name,
  control,
  options,
  setValue,
  errors,
  ...rest
}) => {
  const [selection, setSelection] = useState({ selectedOptions: [] });

  const handleChange = (selectedOption) => {
    setSelection({ selectedOption });
    setValue(
      name,
      selectedOption.map((option) => option.value)
    );
  };

  return (
    <Group label={label} errors={errors}>
      <Controller
        name={name}
        control={control}
        render={() => (
          <Select
            isMulti
            options={options}
            onChange={handleChange}
            value={selection.selectedOptions}
            {...rest}
          />
        )}
      />
    </Group>
  );
};

export const TextInput = ({ name, label, control, errors, ...rest }) => {
  return (
    <Group label={label} errors={errors}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Input {...field} {...rest} />}
      />
    </Group>
  );
};
export const SelectField = ({
  label,
  name,
  control,
  options,
  errors,
  ...rest
}) => {
  return (
    <Group label={label} errors={errors}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            onChange={(e) => {
              // onChange's arg will send value into hook form
              onChange(e.value);
            }}
            value={{
              // make sure we retain the corect format for the controlled component
              value,
              label: options.find((e) => e.value === value)?.label,
            }}
            options={options}
            className="react-select"
            classNamePrefix="react-select"
            {...rest}
          />
        )}
      />
    </Group>
  );
};
export const DatePicker = ({ label, name, control, errors, ...rest }) => {
  return (
    <Group label={label} errors={errors}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <ReactDatePicker
            className="input"
            placeholderText="Select date"
            onChange={(e) => onChange(e)}
            selected={value}
            {...rest}
          />
        )}
      />
    </Group>
  );
};
export const CheckBox = ({ label, name, control }) => {
  return (
    <FormGroup>
      <Controller
        render={({ field }) => (
          <Input
            id={name}
            value={field.value}
            onChange={field.onChange}
            innerRef={field.ref}
            type="checkbox"
          />
        )}
        name={name}
        control={control}
      />
      <Label className="mx-2">{label}</Label>
    </FormGroup>
  );
};
// TODO: implement Radio with options
export const Radio = ({ label, name, control, options }) => {
  return (
    <FormGroup>
      <Controller
        render={({ field }) => (
          <Input
            id={name}
            value={field.value}
            onChange={field.onChange}
            innerRef={field.ref}
            type="radio"
          />
        )}
        name={name}
        control={control}
      />
      <Label className="mx-2">{label}</Label>
    </FormGroup>
  );
};

export const FileUpload = ({ label, errors, name, control }) => {
  return (
    <Group label={label} errors={errors}>
      <Controller
        render={({ field: { onChange, ref } }) => (
          <Input
            type="file"
            id="logoFile"
            onChange={(e) => onChange(e.target.files[0])}
            innerRef={ref}
          />
        )}
        name={name}
        control={control}
      />
    </Group>
  );
};
