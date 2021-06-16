/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Form,
  Row,
  Card,
  CardBody,
  CardTitle,
  Label,
  Button,
  FormGroup,
} from 'reactstrap';
import Select from 'react-select';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { TextInput } from '../../../components/FormFields';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
const AddCompany = () => {
  const { handleSubmit, register, control } = useForm();
  const onSubmit = async (data) => {
    console.log('SUBMIT: ', data);
  };
  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <CardTitle>
              <IntlMessages id="forms.add-company" />
            </CardTitle>{' '}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <TextInput name="name" label="Name" register={register} />
              <TextInput
                name="email"
                label="Contact Email"
                register={register}
              />
              {/* TODO: move tags component to FormFields.jsx
               */}
              <FormGroup>
                <Label>Tags</Label>
                <Controller
                  name="tags"
                  control={control}
                  defaultValue={null}
                  render={({ field: { onChange, label, value } }) => (
                    <Select
                      getOptionValue={(option) => option.value}
                      onChange={(e) => {
                        // onChange's arg will send value into hook form
                        onChange(e.value);
                      }}
                      // eslint-disable-next-line object-shorthand
                      options={options}
                      isMulti
                    />
                  )}
                />
              </FormGroup>
              <Button color="primary" size="lg" type="submit">
                Submit
              </Button>{' '}
            </Form>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default AddCompany;
