/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/prefer-default-export */
import React from 'react';

export const FormikRadioButtonGroup = ({
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
    <>
      {options.map((child, index) => {
        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`${name}_${child.value}_${index}`}
            className={`position-relative form-check ${
              inline ? 'form-check-inline' : ''
            }`}
          >
            <input
              id={child.value}
              name={name}
              type="radio"
              className="form-check-input"
              onChange={() => handleChange(child.value)}
              onBlur={handleBlur}
              defaultChecked={value === child.value}
              disabled={child.disabled}
            />
            <label className="form-check-label">{child.label}</label>
          </div>
        );
      })}
    </>
  );
};
