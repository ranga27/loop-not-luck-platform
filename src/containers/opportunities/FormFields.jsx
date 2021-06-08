/* eslint-disable no-unused-vars */
import React from 'react';
import { Controller } from 'react-hook-form';
import { FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
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
