/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import ReactDatePicker from 'react-datepicker';

export const FormikDatePicker = ({
  name,
  value,
  className,
  onChange,
  onBlur,
  ...rest
}) => {
  const handleChange = (val) => {
    onChange(name, val);
  };

  const handleBlur = (_val) => {
    onBlur(name, true);
  };

  return (
    <ReactDatePicker
      name={name}
      className={className}
      selected={value}
      onChange={handleChange}
      onBlur={handleBlur}
      {...rest}
    />
  );
};
