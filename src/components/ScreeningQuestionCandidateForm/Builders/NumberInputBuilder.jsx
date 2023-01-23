import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from '../../form/FormFields';
import simpleTextFieldSchema from '../../../constants/simpleTextFieldSchema';

const NumberInputBuilder = ({ label }) => {
  const {
    control,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(simpleTextFieldSchema) });

  return (
    <div>
      <TextInput
        label={label}
        name="textField"
        control={control}
        errors={errors.name}
      />
    </div>
  );
};

export default NumberInputBuilder;
