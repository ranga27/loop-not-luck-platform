/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Card, CardBody, Button, Badge } from 'reactstrap';
import { format } from 'date-fns';
import Avatar from 'react-avatar';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { fetchUserProfileDataFromFirestore } from '../../../helpers/firestoreService';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUsers] = useState([]);

  const onDocumentLoadSuccess = () => {
    console.log('PDF loaded');
  };

  useEffect(() => {
    fetchUserProfileDataFromFirestore(id).then((results) => {
      setUsers(results);
    });
  }, [id]);
  return (
    <div>
      <a href="/app/profiles">
        <div className="d-flex">
          <i
            className="iconsminds-back h1 text-primary"
            style={{ width: '30px', fontWeight: 'bold' }}
          />
          <p className="px-4 py-3">Back</p>
        </div>
      </a>

      <Row md="2">
        <Colxx lg="4">
          <Card style={{ marginLeft: '0px' }}>
            <CardBody>
              <div className="d-flex justify-content-center align-items-center">
                <div
                  style={{ width: '90px', height: '90px' }}
                  className="h2 d-flex justify-content-center align-items-center"
                >
                  <Avatar
                    name={`${user.firstName} ${user.lastName || ''}`}
                    className="h3"
                    size={100}
                    round="100%"
                    alt={user.firstName}
                  />
                </div>
              </div>

              <h3 className="text-center mt-2 font--weight-bold text-primary">
                {user.firstName} {user.lastName}
              </h3>
              <h6 className="text-center text-muted text-small mt-2">
                {user.email}
              </h6>
              <Row>
                <div className="d-flex justify-content-center align-items-center flex-row">
                  <a
                    href={`mailto:${user.email}?subject = Feedback&body = Message`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="danger-button text-small bg-secondary text-white rounded"
                  >
                    Email
                  </a>
                  <Button
                    id="saveButton"
                    color="primary"
                    outline
                    className="slider-top-button text-small"
                  >
                    Message
                  </Button>
                </div>
              </Row>
              <dl className="row list-unstyled mt-4">
                <dt className="col-sm-7">First Name</dt>
                <dd className="col-sm-5">{user.firstName}</dd>
                <hr />
                <dt className="col-sm-7">Last Name</dt>
                <dd className="col-sm-5">{user.lastName || 'Not Set'}</dd>
                <hr />
                <dt className="col-sm-7">Mobile Number</dt>
                <dd className="col-sm-5">
                  {user.hasCompletedProfile ? user.mobileNumber : 'Not set'}
                </dd>
                <hr />
                <dt className="col-sm-7">Completed Profile</dt>
                <dd className="col-sm-5">
                  {user.hasCompletedProfile ? 'True' : 'False'}
                </dd>
                <hr />
                <dt className="col-sm-7 mb-2">Profile Completion Date</dt>
                <dd className="col-sm-5">
                  {user.hasCompletedProfile
                    ? format(new Date(user.lastUpdated.toDate()), 'dd-MMM-yyyy')
                    : 'Not set'}
                </dd>
                <hr />
                <dt className="col-sm-7 mb-2">Visa Sponsorship Required</dt>
                <dd className="col-sm-5">
                  {user.hasCompletedProfile ? user.visaRequired : 'Not set'}
                </dd>
                <hr />
                <dt className="col-sm-7">Disability</dt>
                <dd className="col-sm-5">
                  {user.disability}

                  {user.disability === 'Yes' ? (
                    <p> {user.disabilityAnswer}</p>
                  ) : null}
                </dd>
                <hr />
                <dt className="col-sm-7">Gender</dt>
                <dd className="col-sm-5">
                  {user.gender}{' '}
                  {user.genderOther ? <p>{user.ethnicityOther}</p> : null}
                </dd>
                <hr />
                <dt className="col-sm-7">Preferred Start Date</dt>
                <dd className="col-sm-5">
                  {user.start
                    ? format(new Date(user.start.toDate()), 'dd-MMM-yyyy')
                    : 'Not set'}
                </dd>
                <hr />
                <dt className="col-sm-7">Graduation Year</dt>
                <dd className="col-sm-5">
                  {' '}
                  {user.hasCompletedProfile
                    ? format(
                        new Date(user.graduationYear.toDate()),
                        'dd-MMM-yyyy'
                      )
                    : 'Not set'}
                </dd>
              </dl>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx lg="8">
          <Card style={{ marginLeft: '0px' }}>
            <CardBody>
              <dl className="row list-unstyled">
                <dt className="col-sm-5">Ethnicity</dt>
                <dd className="col-sm-7">
                  {user.ethnicity}

                  {user.ethnicityOther ? <p>{user.ethnicityOther}</p> : null}
                </dd>
                <hr />
                <dt className="col-sm-5">Degree Subject</dt>
                <dd className="col-sm-7">
                  {' '}
                  {user.hasCompletedProfile ? user.degreeSubject : 'Not set'}
                </dd>
                <hr />
                <dt className="col-sm-5">Job Value</dt>
                <dd className="col-sm-7">
                  {user.jobValues
                    ? user.jobValues.map((item, index) => (
                        <Badge
                          key={item}
                          pill
                          color={
                            index === 0
                              ? 'primary'
                              : index === 1
                              ? 'success'
                              : 'danger'
                          }
                          className="mx-1 my-1"
                        >
                          {item}
                        </Badge>
                      ))
                    : 'Not set'}
                </dd>
                <hr />
                <dt className="col-sm-5">Behaviours/Attributes/Strengths</dt>
                <dd className="col-sm-7">
                  {user.behaviorAttributes
                    ? user.behaviorAttributes.map((item, index) => (
                        <Badge
                          key={item}
                          pill
                          color={
                            index === 0
                              ? 'primary'
                              : index === 1
                              ? 'success'
                              : 'danger'
                          }
                          className="mx-1 my-1"
                        >
                          {item}
                        </Badge>
                      ))
                    : 'Not set'}
                </dd>
                <hr />
                <dt className="col-sm-5">Technical Skills</dt>
                <dd className="col-sm-7">
                  {user.technicalSkills
                    ? user.technicalSkills.map((item, index) => (
                        <Badge
                          key={item}
                          pill
                          color={
                            index === 0
                              ? 'primary'
                              : index === 1
                              ? 'success'
                              : 'danger'
                          }
                          className="mx-1 my-1"
                        >
                          {item}
                        </Badge>
                      ))
                    : 'Not set'}
                </dd>
                <hr />
                <dt className="col-sm-5">Interests</dt>
                <dd className="col-sm-7">
                  {user.interests
                    ? user.interests.map((item, index) => (
                        <Badge
                          key={item}
                          pill
                          color={
                            index === 0
                              ? 'primary'
                              : index === 1
                              ? 'success'
                              : 'danger'
                          }
                          className="mx-1 my-1"
                        >
                          {item}
                        </Badge>
                      ))
                    : 'Not set'}
                </dd>
                <hr />
                <dt className="col-sm-5">Roles Interested In</dt>
                <dd className="col-sm-7">
                  {user.rolesInterestedIn
                    ? user.rolesInterestedIn.map((item, index) => (
                        <Badge
                          key={item}
                          pill
                          color={
                            index === 0
                              ? 'primary'
                              : index === 1
                              ? 'success'
                              : 'danger'
                          }
                          className="mx-1 my-1"
                        >
                          {item}
                        </Badge>
                      ))
                    : 'Not set'}
                </dd>
              </dl>
            </CardBody>
          </Card>

          <Card style={{ marginLeft: '0px', marginTop: '15px' }}>
            <CardBody>
              <div>
                <Document
                  file={{
                    url: user.cvUrl,
                  }}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={1} />
                </Document>
                <p className="text-muted text-small">
                  Cv Uploaded on:{' '}
                  {user.hasCompletedProfile && user.cvUploadDate !== null
                    ? format(
                        new Date(user.cvUploadDate.toDate()),
                        'dd-MMM-yyyy'
                      )
                    : 'Not set'}
                </p>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </div>
  );
};

export default UserProfile;
