import React from 'react';
import { useForm } from 'react-hook-form';
import { Radio } from '../../form/FormFields';

const RadioButtonBuilder = ({ label, options }) => {
  const {
    control,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <p>{label}</p>
      {options.map((radio) => (
        <Radio
          key={radio.key}
          name={radio.key}
          id={radio.text}
          label={radio.text}
          errors={errors}
          control={control}
          value={radio.text}
        />
      ))}
    </div>
  );
};

export default RadioButtonBuilder;
