/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Button } from 'reactstrap';
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
} from '@react-query-firebase/firestore';
import { useQueryClient } from 'react-query';
import { firestore } from '../../helpers/Firebase';
import SimpleQuestionBuilder from './Builders/SimpleQuestionBuilder';
import CheckBoxBuilder from './Builders/CheckBoxBuilder';
import NumberInputBuilder from './Builders/NumberInputBuilder';
import DropDownBuilder from './Builders/DropDownBuilder';
import RadioButtonBuilder from './Builders/RadioButtonBuilder';
import { getCollection } from '../../helpers/firestoreService';

const QuestionForm = ({
  roleId,
  userUid,
  modelToggle,
  conformForAnswer,
  role,
}) => {
  const [questionData, setquestionData] = useState(null);
  const [userEmail, setuserEmail] = useState('');

  const [answer, setanswer] = useState({});

  const mergeAnswer = (newData) => {
    const updatedAnswer = { ...answer, ...newData };
    setanswer(updatedAnswer);
  };

  const client = useQueryClient();

  const mutation = useFirestoreDocumentMutation(
    doc(firestore, `users/${userUid}/matchedRoles`, roleId),
    { merge: true },
    {
      onSettled: () => {
        client.invalidateQueries('matchedRoles');
        client.invalidateQueries('savedRoles');
      },
    }
  );

  const getuserEmail = async () => {
    const userEmailData = await getDoc(doc(firestore, 'users', userUid));
    setuserEmail(userEmailData.data()?.email);
  };

  useEffect(() => {
    getuserEmail();
  }, [userUid]);

  const appliedRoleMutation = useFirestoreCollectionMutation(
    collection(firestore, 'appliedRoles')
  );

  const applyRole = async () => {
    const newData = { applied: true, updatedAt: serverTimestamp() };
    mutation.mutate(newData);
    appliedRoleMutation.mutate({
      appliedAt: serverTimestamp(),
      match: role.score,
      roleId: role.id,
      roleTitle: role.title,
      status: 'Pending Review',
      userId: userUid,
      companyId: role.companyId,
      applicantEmail: userEmail,
    });
    Swal.fire(
      'Successfully applied!',
      'You can navigate to "Applications" tab to view your applications.',
      'success'
    );
  };

  const handleSubmit = async () => {
    const postRef = doc(firestore, `questionnaire/${roleId}`);
    const likesRef = collection(postRef, 'Answers');
    const newLike = doc(likesRef, userUid);
    await setDoc(newLike, { answer })
      .then(() => {
        applyRole();
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
      <div
        style={{
          width: '80%',
          margin: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        <Button onClick={handleSubmit} style={{ width: '45%' }}>
          Submit
        </Button>
        <Button
          onClick={() => {
            modelToggle();
            conformForAnswer();
          }}
          style={{ width: '45%' }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default QuestionForm;
