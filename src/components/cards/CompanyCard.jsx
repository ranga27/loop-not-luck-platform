import React from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';

import ThumbnailImage from './ThumbnailImage';

const CompanyCard = ({ company }) => {
  return (
    <Card key={company.id} className="d-flex flex-row mb-4">
      <ThumbnailImage className="m-4" src={company.logoUrl} />
      <div className=" d-flex flex-grow-1 min-width-zero">
        <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
          <div className="min-width-zero">
            <CardTitle className="truncate mb-1">{company.name}</CardTitle>
            <Button outline size="xs" color="primary">
              Edit
            </Button>
          </div>
        </CardBody>
      </div>
    </Card>
  );
};

export default CompanyCard;
