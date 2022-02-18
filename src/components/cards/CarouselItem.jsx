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
  startDate,
  deadline,
  score,
}) => {
  return (
    <Card>
      <CardBody>
        <Row md="2">
          <Colxx>
            <h2>{score}% Match</h2>
            <img
              className="responsive mx-auto d-block card-img-role"
              src={logoUrl}
              alt={title}
            />
            <h2 className="mt-3">{organisation}</h2>
            <Separator className="mt-3" />
            <h4 className="mt-3 text-muted text-uppercase">location</h4>
            <h3 className="mt-2">{location}</h3>
            <Separator className="mt-3" />
            <h4 className="mt-3 text-muted text-uppercase">department</h4>
            <h3 className="mt-3">{department}</h3>
            <Separator className="mt-3" />
            <h4 className="mt-3 text-muted text-uppercase">start date</h4>
            <h3 className="mt-3">{startDate}</h3>
            <Separator className="mt-3" />
            <h4 className="mt-3 text-muted text-uppercase">deadline</h4>
            <h3 className="mt-3">{deadline}</h3>
          </Colxx>
          <Colxx>
            <h1 className="truncate">{title}</h1>
            <Separator className="mt-3" />
            <h4 className="mt-3 text-muted text-uppercase">position</h4>
            <h3 className="mt-2">{positionType}</h3>
            <Separator className="mt-3" />
            <h4 className="mt-3 text-muted text-uppercase">description</h4>
            <p className="mt-3">{description}</p>
            <Separator className="mt-3" />
            <h4 className="mt-3 text-muted text-uppercase">qualification</h4>
            <p>{qualification}</p>
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
};
