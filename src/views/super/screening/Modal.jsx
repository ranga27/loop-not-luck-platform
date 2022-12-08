import { format } from 'date-fns';
import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Badge,
  Collapse,
} from 'reactstrap';

import IntlMessages from '../../../helpers/IntlMessages';

const Modals = ({ modalOpen, rolesData, setModalOpen, toggle }) => {
  const [collapse, setCollapse] = useState(false);
  return (
    <Modal isOpen={modalOpen} toggle={toggle} className="modal-lg">
      <ModalHeader>
        {rolesData.firstName} {rolesData.lastName} Application
      </ModalHeader>
      <ModalBody>
        <ListGroup>
          <ListGroupItem>
            <ListGroupItemHeading className="text-primary text-center mt-3 mb-4">
              <IntlMessages id="pages.application-applicantInfo" />
            </ListGroupItemHeading>

            <dl className="row list-unstyled">
              <dt className="col-sm-3">Full Name</dt>
              <dd className="col-sm-9">
                {rolesData.firstName} {rolesData.lastName}
              </dd>
              <dt className="col-sm-3 text-truncate">Email</dt>
              <dd className="col-sm-9">{rolesData.email}</dd>
              <dt className="col-sm-3 text-truncate">Role Match</dt>
              <dd className="col-sm-9">{rolesData.score}%</dd>
            </dl>
            {collapse ? (
              <Button onClick={() => setCollapse(!collapse)} color="link">
                <IntlMessages id="menu.close" />
              </Button>
            ) : (
              <Button onClick={() => setCollapse(!collapse)} color="link">
                <IntlMessages id="menu.viewMore" />
              </Button>
            )}
            <Collapse isOpen={collapse}>
              <dl className="row">
                <dt className="col-sm-3">Degree</dt>
                <dd className="col-sm-9">{rolesData.degreeSubject}</dd>
                <dt className="col-sm-3 text-truncate">Phone number</dt>
                <dd className="col-sm-9">{rolesData.mobileNumber}</dd>
                <dt className="col-sm-3 text-truncate">Gender</dt>
                <dd className="col-sm-9">{rolesData.gender}</dd>
                <dt className="col-sm-3 text-truncate">Gender (Other)</dt>
                <dd className="col-sm-9">{rolesData.genderOther}</dd>
                <dt className="col-sm-3 text-truncate">Ethnicity</dt>
                <dd className="col-sm-9">{rolesData.ethnicity}</dd>
                <dt className="col-sm-3 text-truncate">Ethnicity (Other)</dt>
                <dd className="col-sm-9">{rolesData.ethnicityOther}</dd>
                <dt className="col-sm-3 text-truncate">Disability</dt>
                <dd className="col-sm-9">{rolesData.disability}</dd>
                <dt className="col-sm-3 text-truncate">
                  Disability (if exists)
                </dt>
                <dd className="col-sm-9">{rolesData.disabilityAnswer}</dd>
                <dt className="col-sm-3 text-truncate">Diversity</dt>
                <dd className="col-sm-9">
                  {rolesData.diversity
                    ? rolesData.diversity.map((item) => (
                        <Badge key={item}>{item}</Badge>
                      ))
                    : null}
                </dd>
                <dt className="col-sm-3 text-truncate">Roles Interested In</dt>
                <dd className="col-sm-9">
                  {!Array.isArray(rolesData.rolesInterestedIn) ? (
                    <Badge>{rolesData.rolesInterestedIn}</Badge>
                  ) : (
                    rolesData.rolesInterestedIn.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))
                  )}
                </dd>
                <dt className="col-sm-3 text-truncate">Area Of Interests</dt>
                <dd className="col-sm-9">
                  {!Array.isArray(rolesData.areaOfInterests) ? (
                    <Badge>{rolesData.areaOfInterests}</Badge>
                  ) : (
                    rolesData.areaOfInterests.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))
                  )}
                </dd>
                <dt className="col-sm-3 text-truncate">Is Visa Required</dt>
                <dd className="col-sm-9">{rolesData.visaRequired}</dd>
                <dt className="col-sm-3 text-truncate">Graduation Year</dt>
                <dd className="col-sm-9">
                  {rolesData.graduationYear !== null
                    ? format(
                        new Date(rolesData.graduationYear.toDate()),
                        'dd-MMM-yyyy'
                      )
                    : 'Not set'}
                </dd>
                <dt className="col-sm-3 text-truncate">Start date</dt>
                <dd className="col-sm-9">{rolesData.start}</dd>
              </dl>
            </Collapse>
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeading className="text-primary text-center mt-3 mb-4">
              Role Information
            </ListGroupItemHeading>
            <img
              src={rolesData.logoUrl}
              className="w-12 h-12 mx-auto d-block mb-4"
              alt="Company logo"
            />
            <dl className="row">
              <dt className="col-sm-3">Company</dt>
              <dd className="col-sm-9">{rolesData.roles[0].company}</dd>
              <dt className="col-sm-3 text-truncate">Location</dt>
              <dd className="col-sm-9">{rolesData.roles[0].location}</dd>
              <dt className="col-sm-3 text-truncate">Job Type</dt>
              <dd className="col-sm-9">{rolesData.roles[0].jobType}</dd>
              <dt className="col-sm-3 text-truncate">Job Title</dt>
              <dd className="col-sm-9">{rolesData.roles[0].title}</dd>
              <dt className="col-sm-3">Department</dt>
              <dd className="col-sm-9">{rolesData.roles[0].department}</dd>
              <dt className="col-sm-3 text-truncate">Qualification</dt>
              <dd className="col-sm-9">{rolesData.roles[0].qualification}</dd>
              <dt className="col-sm-3"> Role Description</dt>
              <dd className="col-sm-9">{rolesData.roles[0].description}</dd>
              <dt className="col-sm-3 text-truncate"> Position Type</dt>
              <dd className="col-sm-9">{rolesData.roles[0].positionType}</dd>
              <dt className="col-sm-3 text-truncate">How To Apply</dt>
              <dd className="col-sm-9">{rolesData.roles[0].howToApply}</dd>
              <dt className="col-sm-3 text-truncate">Website</dt>
              <dd className="col-sm-9">{rolesData.roles[0].website}</dd>
              <dt className="col-sm-3 text-truncate">Rolling</dt>
              {rolesData.roles[0].rolling === true ? (
                <dd className="col-sm-9">Yes</dd>
              ) : (
                <dd className="col-sm-9">No</dd>
              )}{' '}
              <dt className="col-sm-3 text-truncate">Published</dt>
              {rolesData.roles[0].publish === true ? (
                <dd className="col-sm-9">Yes</dd>
              ) : (
                <dd className="col-sm-9">No</dd>
              )}
              <dt className="col-sm-3 text-truncate">Creation Date</dt>
              <dd className="col-sm-9">
                {rolesData.roles[0].createdAt !== null
                  ? format(
                      new Date(rolesData.roles[0].createdAt.toDate()),
                      'dd-MMM-yyyy'
                    )
                  : 'Not set'}
              </dd>
              <dt className="col-sm-3 text-truncate">Deadline</dt>
              <dd className="col-sm-9">
                {rolesData.roles[0].deadline !== null
                  ? format(
                      new Date(rolesData.roles[0].deadline.toDate()),
                      'dd-MMM-yyyy'
                    )
                  : 'Not set'}
              </dd>
              <dt className="col-sm-3 text-truncate">Start Date</dt>
              <dd className="col-sm-9">
                {rolesData.roles[0].startDate !== null
                  ? format(
                      new Date(rolesData.roles[0].startDate.toDate()),
                      'dd-MMM-yyyy'
                    )
                  : 'Not set'}
              </dd>
              <dt className="col-sm-3 text-truncate">Area Of Interests</dt>
              <dd className="col-sm-9">
                {rolesData.roles[0].areaOfInterests
                  ? rolesData.roles[0].areaOfInterests.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))
                  : null}
              </dd>
              <dt className="col-sm-3 text-truncate">Roles Of Interests</dt>
              <dd className="col-sm-9">
                {rolesData.roles[0].rolesOfInterests
                  ? rolesData.roles[0].rolesOfInterests.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))
                  : null}
              </dd>
              <dt className="col-sm-3 text-truncate">
                Behaviour Attributes Strengths
              </dt>
              <dd className="col-sm-9">
                {rolesData.roles[0].behaviourAttributesStrengths
                  ? rolesData.roles[0].behaviourAttributesStrengths.map(
                      (item) => <Badge key={item}>{item}</Badge>
                    )
                  : null}
              </dd>
            </dl>
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeading className="text-primary text-center mt-3 mb-4">
              <IntlMessages id="pages.application-actions" />
            </ListGroupItemHeading>
            <dl className="row">
              <dt className="col-sm-3 text-truncate">
                {' '}
                <IntlMessages id="pages.application-cv" />
              </dt>
              <dd className="col-sm-9">
                <a href={rolesData.cvUrl} rel="noreferrer" target="_blank">
                  <IntlMessages id="pages.application-cv" />
                </a>
              </dd>
              <dt className="col-sm-3 text-truncate">CV Uploaded at</dt>
              <dd className="col-sm-9">
                {rolesData.cvUploadDate !== null
                  ? format(
                      new Date(rolesData.cvUploadDate.toDate()),
                      'dd-MMM-yyyy'
                    )
                  : 'Not set'}
              </dd>
            </dl>
          </ListGroupItem>
        </ListGroup>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default Modals;
