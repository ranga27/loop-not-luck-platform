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
        <ModalBody
          style={{
            maxHeight: '465px',
            overflow: 'auto',
          }}
        >
          {isAnswer ? (
            <QuestionForm
              modelToggle={modelToggle}
              roleId={currrentQuestions.id}
              userUid={userUid}
              conformForAnswer={conformForAnswer}
            />
          ) : (
            <div
              style={{
                width: '80%',
                margin: 'auto',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button onClick={conformForAnswer} style={{ width: '45%' }}>
                Answer
              </Button>
              <Button onClick={modelToggle} style={{ width: '45%' }}>
                Later
              </Button>
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default QuestionPopup;
