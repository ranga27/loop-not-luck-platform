/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Input, Label } from 'reactstrap';

export const FormikCustomCheckboxGroup = ({
  name,
  value,
  options,
  inline = false,
  onChange,
  onBlur,
}) => {
  const handleChange = (val) => {
    const valueArray = [...value] || [];
    if (!valueArray.includes(val)) {
      valueArray.push(val);
    } else {
      valueArray.splice(valueArray.indexOf(val), 1);
    }
    onChange(name, valueArray);
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  return (
    <div className="form-options justify-content-center">
      {options.map((child, index) => {
        return (
          <div key={child.label} style={{ display: 'flex' }}>
            <Input
              key={`${name}_${child.value}_${index}`}
              id={`${name}_${child.value}_${index}`}
              type="checkbox"
              name={child.name}
              onChange={() => handleChange(child.value)}
              onBlur={handleBlur}
              checked={value.includes(child.value)}
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
