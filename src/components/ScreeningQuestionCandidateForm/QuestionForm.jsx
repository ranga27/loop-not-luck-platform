/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import SimpleQuestionBuilder from './Builders/SimpleQuestionBuilder';
import CheckBoxBuilder from './Builders/CheckBoxBuilder';
import NumberInputBuilder from './Builders/NumberInputBuilder';
import DropDownBuilder from './Builders/DropDownBuilder';
import RadioButtonBuilder from './Builders/RadioButtonBuilder';
import { getCollection } from '../../helpers/firestoreService';

const QuestionForm = ({ roleId, userUid, modelToggle, conformForAnswer }) => {
  const [questionData, setquestionData] = useState(null);

  useEffect(() => {
    (async () => {
      const roleData = await getCollection('questionnaire', [
        { field: 'roleId', operator: '==', value: roleId },
      ]);
      setquestionData(roleData[0].questions);
    })();
  }, [roleId]);

  console.log(userUid);
  if (!questionData) return 'Loading...';

  return (
    <div>
      <h2>Screening Questions</h2>
      {questionData?.map((question) =>
        question.element === 'TextInput' ? (
          <SimpleQuestionBuilder key={question.id} label={question.label} />
        ) : question.element === 'Checkboxes' ? (
          <CheckBoxBuilder label={question.label} options={question.options} />
        ) : question.element === 'NumberInput' ? (
          <NumberInputBuilder label={question.label} />
        ) : question.element === 'Dropdown' ? (
          <DropDownBuilder label={question.label} options={question.options} />
        ) : question.element === 'RadioButtons' ? (
          <RadioButtonBuilder
            label={question.label}
            options={question.options}
          />
        ) : null
      )}
      <Button>Submit</Button>
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
