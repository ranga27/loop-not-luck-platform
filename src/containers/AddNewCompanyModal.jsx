/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';
import Select from 'react-select';
import { TextInput } from '../components/FormFields';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
const AddNewCompanyModal = ({ modalOpen, toggleModal }) => {
  const { handleSubmit, register, control } = useForm();
  const onSubmit = async (data) => {
    console.log('SUBMIT: ', data);
    toggleModal();
  };
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>Add New Company</ModalHeader>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <TextInput name="name" label="Name" register={register} />
          <TextInput name="email" label="Contact Email" register={register} />
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
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={toggleModal}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Submit
          </Button>{' '}
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default AddNewCompanyModal;
