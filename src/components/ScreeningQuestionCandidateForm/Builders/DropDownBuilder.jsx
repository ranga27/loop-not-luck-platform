import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SelectField } from '../../form/FormFields';

const DropDownBuilder = ({ label, options, mergeAnswer }) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useForm();

  const dropdownValue = watch('select');

  const [selectOptions, setselectOptions] = useState([]);

  useEffect(() => {
    mergeAnswer({ [label]: dropdownValue });
  }, [dropdownValue, label]);

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
