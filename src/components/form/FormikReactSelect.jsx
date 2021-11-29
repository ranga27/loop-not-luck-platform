/* eslint-disable import/prefer-default-export */
import React from 'react';
import Select from 'react-select';

export const FormikReactSelect = ({
  name,
  value,
  options,
  isMulti,
  className,
  onChange,
  onBlur,
}) => {
  const handleChange = (val) => {
    onChange(name, val);
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  return (
    <Select
      className={`react-select ${className}`}
      classNamePrefix="react-select"
      options={options}
      isMulti={isMulti}
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
    />
  );
};
