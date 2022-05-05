import React, { useState } from 'react';
import { Card, CardBody, Badge, Button, Collapse } from 'reactstrap';

const ApplicationsCard = ({ application }) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <Card key={application.id} className="mx-5">
      <CardBody>
        <div className="float-left">
          <div className="d-flex flex-row ">
            <img
              className="saved-role-img responsive"
              src={application.logoUrl}
              alt="application"
            />
            <div>
              <h1
                className="text-primary d-inline-block text-truncate"
                style={{
                  marginLeft: '10px',
                  fontWeight: 'bold',
                  maxWidth: '150px',
                }}
              >
                {application.company}
              </h1>
              <h4
                className="text-muted font-weight-medium d-inline-block text-truncate"
                style={{ marginLeft: '10px', maxWidth: '150px' }}
              >
                {application.title}
              </h4>
            </div>
            <div style={{ marginLeft: '40px' }}>
              <h1>
                <Badge color="primary" pill>
                  {application.score}%
                </Badge>
              </h1>
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          {application.coverLetter === true ? (
            <Button
              id="applyButton"
              color="danger"
              className="p-3"
              disabled
              style={{ width: '100%' }}
            >
              Cover Letter Requested
            </Button>
          ) : (
            <Button
              id="applyButton"
              className="p-3 btn-filled-dark"
              disabled
              style={{ width: '100%' }}
            >
              Application Under Review
            </Button>
          )}
        </div>
        <div className="text-center mt-5">
          {collapse ? (
            <div>
              <Button onClick={() => setCollapse(!collapse)} color="link">
                <span style={{ color: '#F7B919' }}>Close</span>
              </Button>
              <br />
              <span className="block">
                <i
                  className="simple-icon-arrow-up"
                  style={{ fontWeight: 'bold' }}
                />
              </span>
            </div>
          ) : (
            <div>
              <Button onClick={() => setCollapse(!collapse)} color="link">
                <span style={{ color: '#F7B919' }}>View Role Information</span>
              </Button>
              <br />
              <span className="block ">
                <i
                  className="simple-icon-arrow-down"
                  style={{ fontWeight: 'bold' }}
                />
              </span>
            </div>
          )}
        </div>
        <Collapse isOpen={collapse}>
          <div className="mt-3">
            <dl className="row">
              <dt className="col-sm-4">Organisation</dt>
              <dd className="col-sm-8">{application.organisation}</dd>
              <dt className="col-sm-4">Company</dt>
              <dd className="col-sm-8">{application.company}</dd>
              <dt className="col-sm-4 text-truncate">Location</dt>
              <dd className="col-sm-8">{application.location}</dd>
              <dt className="col-sm-4 text-truncate">Job Title</dt>
              <dd className="col-sm-8">{application.title}</dd>
              <dt className="col-sm-4">Department</dt>
              <dd className="col-sm-8">{application.department}</dd>
              <dt className="col-sm-4 text-truncate">Qualification</dt>
              <dd className="col-sm-8">{application.qualification}</dd>
              <dt className="col-sm-4"> Role Description</dt>
              <dd className="col-sm-8">{application.description}</dd>
              <dt className="col-sm-4 text-truncate"> Position Type</dt>
              <dd className="col-sm-8">{application.positionType}</dd>
              <dt className="col-sm-4 text-truncate">How To Apply</dt>
              <dd className="col-sm-8">{application.howToApply}</dd>
              <dt className="col-sm-4 text-truncate">Website</dt>
              <dd className="col-sm-8">{application.website}</dd>
              <dt className="col-sm-4 text-truncate">Rolling</dt>
              {application.rolling === true ? (
                <dd className="col-sm-8">Yes</dd>
              ) : (
                <dd className="col-sm-8">No</dd>
              )}{' '}
              <dt className="col-sm-4 text-truncate">Published</dt>
              {application.publish === true ? (
                <dd className="col-sm-8">Yes</dd>
              ) : (
                <dd className="col-sm-8">No</dd>
              )}
              <dt className="col-sm-4 text-truncate">Creation Date</dt>
              <dd className="col-sm-8">{application.createdAt}</dd>
              {/* <dt className="col-sm-4 text-truncate">Deadline</dt>
              <dd className="col-sm-8">{application.deadline}</dd>
              <dt className="col-sm-4 text-truncate">Start Date</dt>
              <dd className="col-sm-8">{application.startDate}</dd> */}
              <dt className="col-sm-4 text-truncate">Requires cover letter</dt>
              {application.coverLetter === true ? (
                <dd className="col-sm-8">Yes</dd>
              ) : (
                <dd className="col-sm-8">No</dd>
              )}
              <dt className="col-sm-4 text-truncate">Roles Of Interests</dt>
              <dd className="col-sm-8">
                {application.rolesOfInterests
                  ? application.rolesOfInterests.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))
                  : null}
              </dd>
              <dt className="col-sm-4 text-truncate">
                Behaviour Attributes Strengths
              </dt>
              <dd className="col-sm-8">
                {application.behaviourAttributesStrengths
                  ? application.behaviourAttributesStrengths.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))
                  : null}
              </dd>
            </dl>
          </div>
        </Collapse>
      </CardBody>
    </Card>
  );
};

export default ApplicationsCard;
