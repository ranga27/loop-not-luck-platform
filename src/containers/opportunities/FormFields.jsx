import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { FormikReactSelect } from './FormikFields';

export const TextInput = ({ name, label, register, errors, ...rest }) => {
  return (
    <FormGroup className="error-l-100">
      <Label>{label}</Label>
      <Input {...register(name)} {...rest} className="form-control" />
      {errors && (
        <div className="invalid-feedback d-block">{errors.message}</div>
      )}
    </FormGroup>
  );
};
// TODO: integrate with Formikfields and use in PostOpps
export const SelectField = ({
  label,
  name,
  id,
  value,
  options,
  errors,
  touched,
  onChange,
  onBlur,
}) => {
  return (
    <FormGroup className="error-l-100">
      <Label>{label}</Label>
      <FormikReactSelect
        name={name}
        id={id}
        value={value}
        options={options}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errors && touched ? (
        <div className="invalid-feedback d-block">{errors}</div>
      ) : null}
    </FormGroup>
  );
};
