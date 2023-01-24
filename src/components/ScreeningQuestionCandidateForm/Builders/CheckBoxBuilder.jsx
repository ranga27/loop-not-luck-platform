import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckBox } from '../../form/FormFields';

const CheckBoxBuilder = ({ label, options, mergeAnswer }) => {
  const {
    control,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const [checkboxValues, setcheckboxValues] = useState([]);

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
          onChange={(e) => {
            setcheckboxValues([...checkboxValues, e.target.value]);
            mergeAnswer({ [label]: checkboxValues });
          }}
        />
      ))}
    </div>
  );
};

export default CheckBoxBuilder;
