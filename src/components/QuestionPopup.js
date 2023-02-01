import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import React, { useState, useEffect } from 'react';
import QuestionForm from './ScreeningQuestionCandidateForm/QuestionForm';

const QuestionPopup = ({ open, modelToggle, userUid, selectedRoleData }) => {
  const [isAnswer, setIsAnswer] = useState(false);
  const conformForAnswer = () => {
    setIsAnswer(!isAnswer);
  };

  const [currentQuestions, setCurrentQuestions] = useState(null);

  useEffect(() => {
    setCurrentQuestions(selectedRoleData);
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
              roleId={currentQuestions.id}
              role={selectedRoleData}
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
