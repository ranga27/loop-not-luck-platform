import React, { useState } from 'react';
import { Card, CardBody, Badge, Button, Collapse } from 'reactstrap';

const ApplicationsCard = ({ application }) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <Card key={application.id} className="">
      <CardBody data-cy="my-application-application-card">
        <div className="float-left">
          <div className="d-flex flex-row ">
            <img
              className="saved-role-img responsive"
              src={application.logoUrl}
              alt="application"
            />
            <div>
              <h6
                className="text-primary d-inline-block text-truncate"
                style={{
                  marginLeft: '20px',
                  fontWeight: 'bold',
                  maxWidth: '200px',
                }}
              >
                {application.company}
              </h6>
              <h5
                className="text-muted font-weight-medium d-inline-block text-truncate"
                style={{ marginLeft: '20px', maxWidth: '200px' }}
              >
                {application.title}
              </h5>
            </div>
            <div style={{ marginLeft: '40px' }}>
              <h2>
                <Badge color="primary" pill>
                  {application.score}%
                </Badge>
              </h2>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center">
            <p className="pt-1 text-success">
              {application.status ? (
                <p>Application {application.status}</p>
              ) : (
                <p>Application Under Review</p>
              )}
            </p>
            <p>
              {application.status ? (
                <p>Your application to this role is {application.status}.</p>
              ) : (
                <p>
                  Your application to this role is under review. Stay tuned!.
                </p>
              )}
            </p>
          </div>
        </div>
        <div className="text-center mt-3">
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
                <span
                  style={{ color: '#F7B919' }}
                  data-cy="my-application-show-details-button"
                >
                  View Role Information
                </span>
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
              <dt className="col-sm-4 text-truncate">Job type</dt>
              <dd className="col-sm-8">{application.jobType}</dd>
              <dt className="col-sm-4 text-truncate">Location</dt>
              <dd className="col-sm-8">
                {application.locationType}
                <br />
                {application.location}
              </dd>
              <dt className="col-sm-4 text-truncate">Job Title</dt>
              <dd className="col-sm-8">{application.title}</dd>
              <dt className="col-sm-4">Department</dt>
              <dd className="col-sm-8">{application.department}</dd>
              <dt className="col-sm-4 text-truncate">Qualification</dt>
              <dd className="col-sm-8">{application.qualification}</dd>
              <dt className="col-sm-4"> Role Description</dt>
              <dd className="col-sm-8">
                {application.description}
                <br /> <br />
                {application.moreRoleInfo}
              </dd>
              {application.status ? (
                <>
                  <dt className="col-sm-4">Status</dt>
                  <dd className="col-sm-8">{application.status}</dd>
                </>
              ) : null}
              <dt className="col-sm-4 text-truncate"> Position Type</dt>
              <dd className="col-sm-8">{application.positionType}</dd>
              <dt className="col-sm-4 text-truncate">Area Of Interests</dt>
              <dd className="col-sm-8">
                {application.areaOfInterests
                  ? application.areaOfInterests.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))
                  : null}
              </dd>
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
                      <Badge className="mx-2 " key={item}>
                        {item}
                      </Badge>
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
