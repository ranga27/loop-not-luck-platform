/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { doc, serverTimestamp } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { Card, CardBody, Badge, Button } from 'reactstrap';
import { firestore } from '../../helpers/Firebase';

const SavedRoleCard = ({ role }) => {
  const { refetch } = useQuery(['companyMatchedRoles']);
  const [isViewInfo, setIsViewInfo] = useState(true);
  const toggleViewInfo = () => {
    setIsViewInfo(!isViewInfo);
  };
  const user = useQuery(['userAuth']);
  const { uid } = user.data;
  const mutation = useFirestoreDocumentMutation(
    doc(firestore, `users/${uid}/companyMatchedRoles`, role.id),
    { merge: true }
  );
  const applyRole = () => {};
  const saveRole = async () => {
    const newData = { saved: !role.saved, updatedAt: serverTimestamp() };
    mutation.mutate(newData);
    refetch();
  };
  return (
    <Card key={role.id} className="" data-cy="saved-role-role-card">
      <CardBody>
        <div className="float-left">
          <div className="d-flex flex-row ">
            <img
              className="saved-role-img responsive"
              src={role.logoUrl}
              alt={role.title}
            />
            <div>
              <h6 className="font-weight-bold" style={{ marginLeft: '20px' }}>
                {role.company}
              </h6>
              <h5
                className="text-muted font-weight-medium"
                style={{ marginLeft: '20px' }}
              >
                {role.title}
              </h5>
            </div>
            <div>
              <h1>
                <Badge color="primary" pill className="m-1">
                  {role.score}%
                </Badge>
              </h1>
            </div>
          </div>
          <div className="float-center pt-2">
            <h6>Deadline: {role.deadline}</h6>
          </div>
          <div className="d-flex flex-row">
            <Button
              id="applyButton"
              color="primary"
              onClick={() => applyRole()}
              className="slider-top-button"
              disabled={role.applied === true}
              data-cy="saved-role-apply-button"
            >
              {role.applied === true ? 'Applied' : 'Apply'}
            </Button>
            <Button
              id="saveButton"
              color="primary"
              onClick={() => saveRole()}
              outline
              className="slider-top-button"
              data-cy="saved-role-remove-button"
            >
              {role.saved === true ? 'Remove' : 'Save'}
            </Button>
          </div>
          <div>
            <p data-cy="saved-role-view-information">
              {isViewInfo ? '' : role.description}{' '}
              <span
                onClick={toggleViewInfo}
                style={{ color: '#F7B919', fontSize: '15px' }}
              >
                {isViewInfo ? ' View Role Information' : ' Show less'}
              </span>
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SavedRoleCard;
