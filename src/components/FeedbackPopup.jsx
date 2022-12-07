/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, ModalHeader, ModalBody, Form } from 'reactstrap';
import { TextInput } from './form/FormFields';
import { sendWebsiteFeedbackEmail } from '../helpers/firebaseService';

const feedbackSchema = Yup.object().shape({
  fullName: Yup.string().required('Please enter full name'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter an email address'),
  feedback: Yup.string().required('Please enter your feedback'),
});

const buttonStyles = {
  position: 'fixed',
  bottom: 0,
  right: 0,
  zIndex: '99999',
  border: '1px solid #ff272d',
  padding: '0.5rem 1rem',
  backgroundColor: 'rgba(236, 37, 69, 0.4)',
  backdropFilter: 'blur(5px)',
  cursor: 'pointer',
};

const FeedbackPopup = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  const [modal, setModal] = useState(false);

  const defaultValues = {
    fullName: '',
    email: '',
    feedback: '',
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(feedbackSchema),
  });

  const toggle = () => setModal(!modal);

  const onSubmit = async (data) => {
    const { fullName, email, feedback } = data;

    // Send website feedback email to hello@loopnotluck.com
    sendWebsiteFeedbackEmail({
      fullName,
      email,
      feedback,
      subject: `Feedback for page ${currentPage}`,
    });

    reset(defaultValues);
    toggle();
  };

  return (
    <>
      <div onClick={toggle} style={buttonStyles} aria-hidden>
        Any Feedback?
      </div>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>
          Feedback for page {currentPage}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              name="fullName"
              label="Full Name"
              errors={errors.title}
              control={control}
            />
            <TextInput
              name="email"
              label="Email Address"
              errors={errors.email}
              control={control}
            />
            <TextInput
              name="feedback"
              label="Your feedback"
              errors={errors.description}
              type="textarea"
              control={control}
            />
            <Button className="mr-1" color="primary" type="submit">
              Submit
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default FeedbackPopup;
