/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { doc, serverTimestamp } from 'firebase/firestore';
import { useQuery, useQueryClient } from 'react-query';
import { Button, Card, CardBody } from 'reactstrap';
import { firestore } from '../../helpers/Firebase';

const CarouselCardLeft = ({ role }) => {
  const [saved, setSaved] = useState(role.saved);
  const client = useQueryClient();
  // TODO: create readMore component
  const { isLoading } = useQuery(['matchedRoles']);
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const user = useQuery(['userAuth']);
  const { uid } = user.data;
  const mutation = useFirestoreDocumentMutation(
    doc(firestore, `users/${uid}/matchedRoles`, role.id),
    { merge: true },
    {
      // After success or failure, refetch the matchedRoles query. TODO: may be refetch only the role & not the whole list
      onSettled: () => {
        client.invalidateQueries('matchedRoles');
        client.invalidateQueries('savedRoles');
      },
    }
  );
  const saveRole = async () => {
    // Optimistic update for button state
    setSaved(!saved);
    const newData = { saved: !role.saved, updatedAt: serverTimestamp() };
    mutation.mutate(newData);
  };

  const applyRole = async () => {
    const newData = { applied: true, updatedAt: serverTimestamp() };
    mutation.mutate(newData);
  };

  return (
    <Card style={{ marginLeft: '0px' }}>
      <CardBody>
        <div className="d-flex flex-row m-3 p-3">
          <img
            className="responsive"
            src={role.logoUrl}
            alt={role.title}
            style={{
              width: '150px',
            }}
          />
          <div>
            <h1
              className="text-primary"
              style={{ marginLeft: '50px', fontWeight: 'bold' }}
            >
              {role.company}
            </h1>
            <h2
              className="text-muted font-weight-medium"
              style={{ marginLeft: '50px', fontSize: '20px' }}
            >
              {role.title}
            </h2>
          </div>
        </div>
        <div className="m-3 p-3">
          <h3 className="mt-3" style={{ fontWeight: 'bold' }}>
            {' '}
            Application Deadline:
          </h3>
          <h3 className="text-muted">{role.deadline}</h3>
          <h3 className="mt-3" style={{ fontWeight: 'bold' }}>
            Location
          </h3>
          <h3 className="text-muted">{role.location}</h3>
          <h3 className="mt-3" style={{ fontWeight: 'bold' }}>
            Position
          </h3>
          <h3 className="text-muted">{role.positionType}</h3>
          <h3 className="mt-3" style={{ fontWeight: 'bold' }}>
            Renumeration
          </h3>
          <h3 className="text-muted">{role.renumeration}</h3>
          <h3 className="mt-3" style={{ fontWeight: 'bold' }}>
            Description
          </h3>
          {role.description && (
            <h3 className="text-muted">
              {isReadMore ? role.description.slice(0, 150) : role.description}
              <span onClick={toggleReadMore} style={{ color: '#F7B919' }}>
                {role.description.length > 150
                  ? isReadMore
                    ? ' Read more'
                    : ' Show less'
                  : ''}
              </span>
            </h3>
          )}
          <h3 className="mt-3" style={{ fontWeight: 'bold' }}>
            Department
          </h3>
          <h3 className="text-muted">{role.department}</h3>
          <h3 className="mt-3" style={{ fontWeight: 'bold' }}>
            Start Date
          </h3>
          <h3 className="text-muted">{role.startDate}</h3>
        </div>

        <div className="d-flex flex-row">
          {role.applied === true ? (
            <Button
              id="applyButton"
              color="primary"
              className="slider-top-button"
              disabled
            >
              Applied
            </Button>
          ) : (
            <Button
              id="applyButton"
              color="primary"
              onClick={() => applyRole()}
              className="slider-top-button"
            >
              Apply
            </Button>
          )}

          <Button
            id="saveButton"
            color="primary"
            onClick={() => saveRole()}
            outline
            className="slider-top-button"
            disabled={isLoading}
          >
            {saved === true ? 'Unsave' : 'Save'}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default CarouselCardLeft;
