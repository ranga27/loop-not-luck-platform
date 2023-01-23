import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import React, { useState, useEffect } from 'react';
import QuestionForm from './ScreeningQuestionCandidateForm/QuestionForm';

const QuestionPopup = ({ open, modelToggle, userUid, selectedRoleData }) => {
  const [isAnswer, setisAnswer] = useState(false);
  const conformForAnswer = () => {
    setisAnswer(!isAnswer);
  };

  const [currrentQuestions, setCurrrentQuestions] = useState(null);

  useEffect(() => {
    setCurrrentQuestions(selectedRoleData);
  }, [selectedRoleData]);
  return (
    <div>
      <Modal isOpen={open} modelToggle={modelToggle}>
        <ModalHeader>
          Please answer the question to complete the appliation
        </ModalHeader>
        <ModalBody>
          {isAnswer ? (
            <QuestionForm
              modelToggle={modelToggle}
              roleId={currrentQuestions.id}
              userUid={userUid}
              conformForAnswer={conformForAnswer}
            />
          ) : (
            <div>
              <Button onClick={conformForAnswer}>Answer</Button>
              <Button onClick={modelToggle}>Later</Button>
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default QuestionPopup;
