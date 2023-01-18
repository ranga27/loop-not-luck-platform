/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import { FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';

// TODO: create a smart component passing individual components as children to form

const Group = ({ label, errors, children }) => {
  return (
    <FormGroup>
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
  clearErrors,
  defaultValue,
  dataCy,
  ...rest
}) => {
  const setDefaultValues = options.filter((o) => {
    return defaultValue?.some((d) => {
      return o.value === d;
    });
  });
  const [selection, setSelection] = useState({
    selectedOptions: [],
  });
  const handleChange = (selectedOption) => {
    clearErrors(name);
    setSelection({ selectedOption });
    setValue(
      name,
      selectedOption.map((option) => option.value)
    );
  };
  useEffect(() => {
    // HACK: to reset values on first render
    setSelection([]);
    if (defaultValue) {
      setSelection({ selectedOptions: setDefaultValues });
    }
  }, [defaultValue]);

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
            id={dataCy}
            aria-label={dataCy}
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
  dataCy,
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
            id={dataCy}
            aria-label={dataCy}
            {...rest}
          />
        )}
      />
    </Group>
  );
};
export const DatePicker = ({
  dataCy,
  label,
  name,
  control,
  errors,
  ...rest
}) => {
  return (
    <Group label={label} errors={errors}>
      <Controller
        control={control}
        name={name}
        data-cy={dataCy}
        render={({ field: { onChange, value } }) => (
          <ReactDatePicker
            className="input"
            placeholderText="Select date"
            onChange={(e) => onChange(e)}
            selected={value}
            id={dataCy}
            aria-label={dataCy}
            {...rest}
          />
        )}
      />
    </Group>
  );
};
export const CheckBox = ({ label, name, control, ...rest }) => {
  return (
    <FormGroup>
      <Controller
        render={({ field }) => (
          <Input
            id={name}
            onChange={field.onChange}
            innerRef={field.ref}
            type="checkbox"
            {...rest}
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

export const FileUpload = ({
  dataCy,
  label,
  errors,
  name,
  control,
  ...rest
}) => {
  return (
    <Group label={label} errors={errors}>
      <Controller
        render={({ field: { onChange, ref } }) => (
          <Input
            type="file"
            id="logoFile"
            onChange={(e) => onChange(e.target.files[0])}
            innerRef={ref}
            {...rest}
            aria-label={dataCy}
          />
        )}
        name={name}
        control={control}
      />
    </Group>
  );
};
