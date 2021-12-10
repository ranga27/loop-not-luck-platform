import React from 'react';
import { FormGroup, Label } from 'reactstrap';

// TODO: check if formik meta can be used to replace this
const FormGroupContainer = ({ label, error, children }) => {
  return (
    <FormGroup className="mb-5">
      <Label>{label}</Label>
      {children}
      {error ? <div className="invalid-feedback d-block">{error}</div> : null}
    </FormGroup>
  );
};

export default FormGroupContainer;
