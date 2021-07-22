/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import AddCompanyForm from '../../../containers/AddCompanyForm';

const Test = () => {
  const { control, reset } = useForm();
  const allTags = [
    {
      key: 0,
      label: 'hello world',
      value: '1',
    },
    {
      key: 1,
      label: 'test',
      value: '2',
    },
  ];

  console.log(
    useWatch({
      control,
      name: 'tags',
    })
  );

  useEffect(() => {
    setTimeout(() => {
      reset({
        tags: {
          key: 0,
          label: 'hello world',
          value: '1',
        },
      });
    }, 1000);
  }, [reset]);
  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <CardTitle>Test Page</CardTitle>
            <>
              <Controller
                name="tags"
                defaultValue={[]}
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    isMulti
                    placeholder="Select existing or create new..."
                    options={allTags}
                    classNamePrefix="select"
                    {...field}
                  />
                )}
              />
            </>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Test;
