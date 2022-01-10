/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/prefer-default-export */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Input, Label } from 'reactstrap';

export const FormikCustomRadioGroup = ({
  name,
  value,
  options,
  inline = false,
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
    <div className="form-options">
      {options.map((child, index) => {
        return (
          <div key={child.name} style={{ display: 'flex' }}>
            <Input
              key={`${name}_${child.value}_${index}`}
              type="radio"
              id={`${name}_${child.value}_${index}`}
              name={child.name}
              onChange={() => handleChange(child.value)}
              onBlur={handleBlur}
              checked={value === child.value}
              disabled={child.disabled}
              inline={inline}
            />
            <Label className="mx-2">{child.label}</Label>
          </div>
        );
      })}
    </div>
  );
};
