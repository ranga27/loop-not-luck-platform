/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Label, Form } from 'reactstrap';
import { AccountSchema } from '../constants/accountSchema';
import { TextInput } from './form/FormFields';
// TODO: send data from container
const AccountForm = ({ defaultValues }) => {
  const {
    watch,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(AccountSchema) });

  const onSubmit = async (data) => console.log('SUBMIT: ', data);

  console.log(watch('firstName')); // watch input value by passing the name of it

  // TODO: convert into smart form
  return (
    /* "handleSubmit" will validate inputs before invoking "onSubmit" */
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="av-tooltip tooltip-label-right"
    >
      <TextInput
        name="firstName"
        label="First Name"
        register={register}
        errors={errors.firstName}
        defaultValue={defaultValues.firstName}
        onChange={(e) => setValue('firstName', e.target.value)}
      />
      <Button color="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AccountForm;
