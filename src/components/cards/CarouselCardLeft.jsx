/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { doc, serverTimestamp } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { Button, Card, CardBody } from 'reactstrap';
import { firestore } from '../../helpers/firebase';

const CarouselCardLeft = ({ role, applyRole }) => {
  // TODO: create readMore component
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const user = useQuery(['userAuth']);
  const { uid } = user.data;
  const mutation = useFirestoreDocumentMutation(
    doc(firestore, `users/${uid}/matchedRoles`, role.id),
    { merge: true }
  );
  const saveRole = async () => {
    const newData = { saved: !role.saved, updatedAt: serverTimestamp() };
    mutation.mutate(newData);
  };
  return (
    <Card style={{ marginLeft: '70px' }}>
      <CardBody>
        <div className="d-flex flex-row m-3 p-3">
          <img
            className="list-thumbnail align-self-center responsive"
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
        </div>
        <div className="m-3 p-3">
          <h3 className="mt-3"> Application Deadline:</h3>
          <h3 className="text-muted">{role.deadline}</h3>
          <h3 className="mt-3">Location</h3>
          <h3 className="text-muted">{role.location}</h3>
          <h3 className="mt-3">Position</h3>
          <h3 className="text-muted">{role.positionType}</h3>
          <h3 className="mt-3">Renumeration</h3>
          <h3 className="text-muted">{role.renumeration}</h3>
          <h3 className="mt-3">Description</h3>
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
          <h3 className="mt-3">Department</h3>
          <h3 className="text-muted">{role.department}</h3>
          <h3 className="mt-3">Start Date</h3>
          <h3 className="text-muted">{role.startDate}</h3>
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
            {role.saved === true ? 'Unsave' : 'Save'}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default CarouselCardLeft;
