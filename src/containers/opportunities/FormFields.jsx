/* eslint-disable no-unused-vars */
import React from 'react';
import { Controller, useController } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import { FormGroup, Label, Input, CustomInput } from 'reactstrap';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';

// TODO: create a smart component passing individual components as children to form: https://codesandbox.io/s/react-hook-form-smart-form-component-forked-iq89z

const Group = ({ label, errors, children }) => {
  return (
    <FormGroup className="error-l-100">
      <Label>{label}</Label>
      {children}
      {errors && (
        <div className="invalid-feedback d-block">{errors.message}</div>
      )}
    </FormGroup>
  );
};

export const TextInput = ({ name, label, register, errors, ...rest }) => {
  return (
    <Group label={label} errors={errors}>
      <Input {...register(name)} {...rest} className="form-control" />
    </Group>
  );
};
export const SelectField = ({ label, name, control, options, errors }) => {
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
              label: value,
            }}
            options={options}
            className="react-select"
            classNamePrefix="react-select"
          />
        )}
      />
    </Group>
  );
};
export const DatePicker = ({ label, name, control }) => {
  return (
    <Group label={label}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <ReactDatePicker
            className="input"
            placeholderText="Select date"
            onChange={(e) => onChange(e)}
            selected={value}
            dateFormat="dd/MM/yyyy"
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
          <CustomInput
            id={name}
            value={field.value}
            onChange={field.onChange}
            innerRef={field.ref}
            type="checkbox"
            label={label}
          />
        )}
        name={name}
        control={control}
      />
    </FormGroup>
  );
};
