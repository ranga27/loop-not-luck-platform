import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SelectField } from '../../form/FormFields';

const DropDownBuilder = ({ label, options }) => {
  const {
    control,
    formState: { errors },
  } = useForm();

  const [selectOptions, setselectOptions] = useState([]);

  useEffect(() => {
    const tempOption = [];
    for (let i = 0; i < options.length; i += 1) {
      tempOption.push({ value: options[i].text, label: options[i].text });
    }
    setselectOptions(tempOption);
  }, [options]);

  return (
    <div>
      <SelectField
        label={label}
        name="select"
        control={control}
        options={selectOptions}
        errors={errors.name}
      />
    </div>
  );
};

export default DropDownBuilder;
