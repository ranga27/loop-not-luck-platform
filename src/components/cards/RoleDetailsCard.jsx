/* eslint-disable no-unused-vars */
import React from 'react';
import { Card, CardBody } from 'reactstrap';
import Item from './RoleDetailsItem';

const RoleDetailsCard = ({ role }) => {
  const getDate = (date) => {
    if (date) {
      const dateStr = new Date(date.seconds * 1000);
      return dateStr.toDateString();
    }
    return 'N/A';
  };
  return (
    <Card>
      <CardBody>
        <div className="text-center">
          <h5 className="mb-4 font-weight-semibold color-theme-1 mb-4">
            {role.title}
          </h5>
        </div>
        <div className="pl-3 pr-3 pt-3 pb-0 d-flex flex-column flex-grow-1">
          {/* TODO: Make a smart component by rendering list items */}
          <Item title="Description" content={role.description} />
          <Item title="Location" content={role.location} />
          <Item title="Start Date" content={getDate(role.startDate)} />
          <Item title="Position Type" content={role.positionType} />
          <Item title="Department" content={role.department} />
          <Item title="Qualification" content={role.qualification} />
          <Item title="Organisation" content={role.organisation} />
          <Item title="Deadline" content={getDate(role.deadline)} />
          <Item title="Industry" content={role.industry} />
          <Item title="Category" content={role.category} />
          <Item title="Apply Link" content={role.applyLink} />
          <Item title="Level" content={role.level} />
          <Item title="Posted Date" content={getDate(role.postedDate)} />
          <Item title="Type" content={role.type} />
          <Item title="Job ID" content={role.jobId} />
          <Item title="Job URL" content={role.url} />
        </div>
      </CardBody>
    </Card>
  );
};

export default RoleDetailsCard;
