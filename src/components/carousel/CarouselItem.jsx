/* eslint-disable react/no-array-index-key */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import { Colxx, Separator } from '../common/CustomBootstrap';

export const CarouselItem = ({
  title,
  logoUrl,
  organisation,
  description,
  location,
  positionType,
  qualification,
  department,
}) => {
  return (
    <Card>
      <CardBody>
        <Row md="2">
          <Colxx>
            <img
              className="responsive mx-auto d-block card-img-role"
              src={logoUrl}
              alt={title}
            />
            <h2>{organisation}</h2>
            <h3>{location}</h3>
            <h3>Department: {department}</h3>
          </Colxx>
          <Colxx>
            <h1 className=" mb-1 truncate">{title}</h1>
            <h2>Position: {positionType}</h2>
            <h3>Description</h3>
            <p className="mb-0">{description}</p>
            <h3>Qualification</h3>
            <p>{qualification}</p>
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
};
