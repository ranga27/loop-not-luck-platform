/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { doc, serverTimestamp } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { Card, CardBody, Badge, Button } from 'reactstrap';
import { firestore } from '../../helpers/Firebase';

const SavedRoleCard = ({ role }) => {
  const { refetch } = useQuery(['matchedRoles']);
  const [isViewInfo, setIsViewInfo] = useState(true);
  const toggleViewInfo = () => {
    setIsViewInfo(!isViewInfo);
  };
  const user = useQuery(['userAuth']);
  const { uid } = user.data;
  const mutation = useFirestoreDocumentMutation(
    doc(firestore, `users/${uid}/matchedRoles`, role.id),
    { merge: true }
  );
  const applyRole = () => {};
  const saveRole = async () => {
    const newData = { saved: !role.saved, updatedAt: serverTimestamp() };
    mutation.mutate(newData);
    refetch();
  };
  return (
    <Card key={role.id} className="mx-5">
      <CardBody>
        <div className="float-left">
          <div className="d-flex flex-row ">
            <img
              className="saved-role-img responsive"
              src={role.logoUrl}
              alt={role.title}
            />
            <div>
              <h1 className="font-weight-bold" style={{ marginLeft: '50px' }}>
                {role.company}
              </h1>
              <h2
                className="text-muted font-weight-medium"
                style={{ marginLeft: '50px' }}
              >
                {role.title}
              </h2>
            </div>
            <div>
              <h1>
                <Badge color="primary" pill className="m-1">
                  {role.score}%
                </Badge>
              </h1>
            </div>
          </div>
          <div className="float-center">
            <h3>{role.daysToDeadline} days until deadline</h3>
          </div>
          <div className="d-flex flex-row">
            <Button
              id="applyButton"
              color="primary"
              onClick={() => applyRole()}
              className="slider-top-button"
            >
              Apply
            </Button>
            <Button
              id="saveButton"
              color="primary"
              onClick={() => saveRole()}
              outline
              className="slider-top-button"
            >
              {role.saved === true ? 'Remove' : 'Save'}
            </Button>
          </div>
          <div>
            <h3>
              {isViewInfo ? '' : role.description}{' '}
              <span onClick={toggleViewInfo} style={{ color: '#F7B919' }}>
                {isViewInfo ? ' View Role Information' : ' Show less'}
              </span>
            </h3>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SavedRoleCard;
