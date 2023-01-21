import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import React from 'react';

const QuestionPopup = ({ open }) => {
  return (
    <div>
      <Modal isOpen={open}>
        <ModalHeader>
          Please answer the question to complete the appliation
        </ModalHeader>
        <ModalBody>
          <Button>Answer</Button>
          <Button>Later</Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default QuestionPopup;
