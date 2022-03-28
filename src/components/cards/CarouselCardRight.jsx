import React from 'react';
import { Card, CardBody } from 'reactstrap';

const CarouselCardRight = ({ role }) => {
  return (
    <Card style={{ marginLeft: '70px' }}>
      <CardBody>
        <h1>You are a {role.score}% match</h1>
      </CardBody>
    </Card>
  );
};

export default CarouselCardRight;
