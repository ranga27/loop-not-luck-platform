/* eslint-disable react/no-array-index-key */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Card, CardBody } from 'reactstrap';

export const SingleCarouselItem = ({ title, logoUrl, detail }) => {
  return (
    <div className="glide-item">
      <Card className="flex-row">
        <img
          className="list-thumbnail responsive border-0 card-img-left"
          src={logoUrl}
          alt={title}
        />
        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
            <p className="list-item-heading mb-1 truncate">{title}</p>
            <p className="mb-0 text-muted text-small">{detail}</p>
          </CardBody>
        </div>
      </Card>
    </div>
  );
};
