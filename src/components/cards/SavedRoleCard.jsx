/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardTitle, Button, Badge } from 'reactstrap';
import useCompanyStore from '../../hooks/useCompanyStore';

const SavedRoleCard = ({ role }) => {
  const setCompany = useCompanyStore((state) => state.setCompanyForEdit);
  return (
    <Card key={role.id}>
      <CardBody>
        <div className="float-left">
          <div className="d-flex flex-row ">
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

export default SavedRoleCard;
