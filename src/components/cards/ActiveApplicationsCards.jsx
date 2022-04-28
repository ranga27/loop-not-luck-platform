import React from 'react';
import { Card, CardBody, Badge, Button } from 'reactstrap';

const ActiveApplicationCard = ({ application }) => {
  return (
    <Card key={application.id} className="mx-5">
      <CardBody>
        <div className="float-left">
          <div className="d-flex flex-row ">
            <img
              className="saved-role-img responsive"
              /* eslint-disable global-require */
              src={require('../../assets/logos/black.png')}
              alt="application"
            />
            <div>
              <h1
                className="text-primary"
                style={{ marginLeft: '10px', fontWeight: 'bold' }}
              >
                {application.company}
              </h1>
              <h4
                className="text-muted font-weight-medium"
                style={{ marginLeft: '10px' }}
              >
                {application.jobTitle}
              </h4>
            </div>
            <div style={{ marginLeft: '40px' }}>
              <h1>
                <Badge color="primary" pill>
                  {application.match}%
                </Badge>
              </h1>
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          {application.action === 'Cover Letter Requested' ? (
            <Button
              id="applyButton"
              color="danger"
              className="p-3"
              style={{ width: '100%' }}
            >
              {application.action}
            </Button>
          ) : (
            <Button
              id="applyButton"
              className="p-3 btn-filled-dark"
              style={{ width: '100%' }}
            >
              {application.action}
            </Button>
          )}
        </div>

        <div className="text-center mt-5">
          <h6>
            <span style={{ color: '#F7B919' }}>View Role Information</span>
          </h6>
          <i
            className="simple-icon-arrow-down"
            style={{ fontWeight: 'bold' }}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default ActiveApplicationCard;
