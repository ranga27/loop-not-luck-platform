import React from 'react';
import { useForm } from 'react-hook-form';
import { CheckBox } from '../../form/FormFields';

const CheckBoxBuilder = ({ label, options }) => {
  const {
    control,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  return (
    <div>
      <p>{label}</p>
      {options.map((opt) => (
        <CheckBox
          key={opt.key}
          name={opt.text}
          label={opt.text}
          control={control}
          errors={errors.name}
          value={opt.text}
        />
      ))}
    </div>
  );
};

export default CheckBoxBuilder;
