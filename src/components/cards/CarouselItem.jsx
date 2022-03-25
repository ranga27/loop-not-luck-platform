/* eslint-disable react/no-array-index-key */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import { Colxx } from '../common/CustomBootstrap';
import StateButton from '../StateButton';

export const CarouselItem = ({
  id,
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
  saveRole,
  applyRole,
}) => {
  return (
    <Row md="2">
      <Colxx>
        <Card style={{ marginLeft: '70px' }}>
          <CardBody>
            <img
              className="responsive mx-auto card-img-role"
              src={logoUrl}
              alt={title}
            />
            <h1 className="m-3">{organisation}</h1>
            <h2 className="text-muted truncate">{title}</h2>
            <h4 className="mt-3 text-muted text-uppercase">location</h4>
            <h3 className="mt-2">{location}</h3>
            <h4 className="mt-3 text-muted text-uppercase">department</h4>
            <h3 className="mt-3">{department}</h3>
            <h4 className="mt-3 text-muted text-uppercase">start date</h4>
            <h3 className="mt-3">{startDate}</h3>
            <h4 className="mt-3 text-muted text-uppercase">deadline</h4>
            <h3 className="mt-3">{deadline}</h3>
            <StateButton
              id="applyButton"
              color="info"
              onClick={() => applyRole(id)}
            >
              Apply
            </StateButton>
            <StateButton
              id="saveButton"
              color="primary"
              onClick={() => saveRole(id)}
            >
              Save
            </StateButton>
          </CardBody>
        </Card>
      </Colxx>
      <Colxx>
        <Card style={{ marginRight: '70px' }}>
          <CardBody>
            <h1>You are a {score}% match</h1>
            <h4 className="mt-3 text-muted text-uppercase">position</h4>
            <h3 className="mt-2">{positionType}</h3>
            <h4 className="mt-3 text-muted text-uppercase">description</h4>
            <p className="mt-3">{description}</p>
            <h4 className="mt-3 text-muted text-uppercase">qualification</h4>
            <p>{qualification}</p>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};
