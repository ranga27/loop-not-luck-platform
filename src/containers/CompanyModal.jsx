/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { adminRoot } from '../constants/defaultValues';

export const ErrorModal = ({ modalOpen, toggleModal }) => {
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} backdrop="static">
      <ModalHeader toggle={toggleModal}>
        Error while adding new company
      </ModalHeader>
      <ModalBody>A company with that name already exists</ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          OK
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export const SuccessModal = ({ modalOpen, toggleModal }) => {
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} backdrop="static">
      <ModalHeader toggle={toggleModal}>New Company Added</ModalHeader>
      <ModalBody>Company added successfully</ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          outline
          onClick={toggleModal}
          tag={Link}
          to={`${adminRoot}/admin/companies`}
        >
          OK
        </Button>
      </ModalFooter>
    </Modal>
  );
};
