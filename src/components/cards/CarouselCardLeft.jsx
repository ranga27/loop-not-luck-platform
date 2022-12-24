/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Swal from 'sweetalert2';
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

    Swal.fire(
      `Successfully ${saved ? 'unsaved' : 'saved'}!`,
      'You can navigate to "Saved Roles" tab to view your saved roles.',
      'success'
    );
  };

  const applyRole = async () => {
    const newData = { applied: true, updatedAt: serverTimestamp() };
    mutation.mutate(newData);

    Swal.fire(
      'Successfully applied!',
      'You can navigate to "Applications" tab to view your applications.',
      'success'
    );
  };

  return (
    <Card style={{ marginLeft: '0px' }}>
      <CardBody>
        <div className="d-flex flex-row m-2 p-2">
          <img
            className="responsive"
            src={role.logoUrl}
            alt={role.title}
            style={{
              width: '100px',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '50% 50%',
            }}
          />
          <div>
            <h6
              className="text-primary"
              style={{ marginLeft: '20px', fontWeight: 'bold' }}
            >
              {role.company}
            </h6>
            <h5
              className="text-muted font-weight-medium"
              style={{ marginLeft: '20px', fontSize: '14px' }}
            >
              {role.title}
            </h5>
          </div>
        </div>
        <div className="m-2 p-2">
          <h6 style={{ fontWeight: 'bold' }}>Application Deadline:</h6>
          <h6 className="text-muted">{role.deadline}</h6>
          <h6 className="mt-2" style={{ fontWeight: 'bold' }}>
            Location
          </h6>
          <h6 className="text-muted">{role.jobType || ''}</h6>
          <h6 className="text-muted">{role.location}</h6>
          <h6 className="mt-2" style={{ fontWeight: 'bold' }}>
            Position
          </h6>
          <h6 className="text-muted">{role.positionType}</h6>
          <h6 className="mt-2" style={{ fontWeight: 'bold' }}>
            Salary
          </h6>
          <h6 className="text-muted">{role.salary}</h6>
          <h6 className="mt-2" style={{ fontWeight: 'bold' }}>
            Description
          </h6>
          {role.description && (
            <h6 className="text-muted">
              {isReadMore ? role.description.slice(0, 150) : role.description}
              <span onClick={toggleReadMore} style={{ color: '#F7B919' }}>
                {role.description.length > 150
                  ? isReadMore
                    ? ' Read more'
                    : ' Show less'
                  : ''}
              </span>
            </h6>
          )}
          <h6 className="mt-2" style={{ fontWeight: 'bold' }}>
            Department
          </h6>
          <h6 className="text-muted">{role.department}</h6>
          <h6 className="mt-2" style={{ fontWeight: 'bold' }}>
            Start Date
          </h6>
          <h6 className="text-muted">{role.startDate}</h6>
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
