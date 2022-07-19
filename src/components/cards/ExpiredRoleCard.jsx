/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { differenceInDays } from 'date-fns';
import { Card, CardBody, CardImg, CardTitle, Button, Badge } from 'reactstrap';
import { serverTimestamp } from 'firebase/firestore';
import StateButton from '../StateButton';

const ExpiredRoleCard = ({ role }) => {
  return (
    <Card key={role.id} className="mb-5">
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
        </div>
      </CardBody>
    </Card>
  );
};

export default ExpiredRoleCard;
