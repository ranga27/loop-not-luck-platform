/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { collection, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../helpers/Firebase';
import SimpleQuestionBuilder from './Builders/SimpleQuestionBuilder';
import CheckBoxBuilder from './Builders/CheckBoxBuilder';
import NumberInputBuilder from './Builders/NumberInputBuilder';
import DropDownBuilder from './Builders/DropDownBuilder';
import RadioButtonBuilder from './Builders/RadioButtonBuilder';
import { getCollection } from '../../helpers/firestoreService';

const QuestionForm = ({ roleId, userUid, modelToggle, conformForAnswer }) => {
  const [questionData, setquestionData] = useState(null);

  const [answer, setanswer] = useState({});

  const mergeAnswer = (newData) => {
    const updatedAnswer = { ...answer, ...newData };
    setanswer(updatedAnswer);
  };

  const handleSubmit = async () => {
    console.log(userUid);

    const postRef = doc(firestore, `questionnaire/${roleId}`);
    const likesRef = collection(postRef, 'Answers');
    const newLike = doc(likesRef, userUid);
    await setDoc(newLike, { answer })
      .then(() => {
        modelToggle();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    (async () => {
      const roleData = await getCollection('questionnaire', [
        { field: 'roleId', operator: '==', value: roleId },
      ]);
      setquestionData(roleData[0].questions);
    })();
  }, [roleId]);

  if (!questionData) return 'Loading...';

  return (
    <div>
      <h2>Screening Questions</h2>
      {questionData?.map((question) =>
        question.element === 'TextInput' ? (
          <SimpleQuestionBuilder
            key={question.id}
            label={question.label}
            mergeAnswer={mergeAnswer}
          />
        ) : question.element === 'Checkboxes' ? (
          <CheckBoxBuilder
            label={question.label}
            options={question.options}
            mergeAnswer={mergeAnswer}
          />
        ) : question.element === 'NumberInput' ? (
          <NumberInputBuilder
            label={question.label}
            mergeAnswer={mergeAnswer}
          />
        ) : question.element === 'Dropdown' ? (
          <DropDownBuilder
            label={question.label}
            options={question.options}
            mergeAnswer={mergeAnswer}
          />
        ) : question.element === 'RadioButtons' ? (
          <RadioButtonBuilder
            label={question.label}
            options={question.options}
            mergeAnswer={mergeAnswer}
          />
        ) : null
      )}
      <Button onClick={handleSubmit}>Submit</Button>
      <Button
        onClick={() => {
          modelToggle();
          conformForAnswer();
        }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default QuestionForm;
