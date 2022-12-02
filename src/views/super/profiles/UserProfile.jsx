/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  Button,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from 'reactstrap';
import { collection, query } from 'firebase/firestore';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import Avatar from 'react-avatar';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { SelectField, TextInput } from '../../../components/form/FormFields';
import { firestore } from '../../../helpers/Firebase';
import { fetchUserProfileDataFromFirestore } from '../../../helpers/firestoreService';
import { sendSms } from '../../../helpers/firebaseService';

const YupErrorCheck = Yup.object().shape({
  sendSmsOption: Yup.string().required('Please select one option'),
  customMessage: Yup.string().when('sendSmsOption', {
    is: (value) => value === 'customMessage',
    then: Yup.string().required('Please add a custom message'),
  }),
  template: Yup.string().when('sendSmsOption', {
    is: (value) => value === 'template',
    then: Yup.string().required('Please select one template'),
  }),
});

const messageOptions = [
  { label: 'Template', value: 'Template' },
  { label: 'Custom message', value: 'Custom message' },
];

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const onDocumentLoadSuccess = () => {
    console.log('PDF loaded');
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    fetchUserProfileDataFromFirestore(id).then((results) => {
      setUsers(results);
    });
  }, [id]);
  const { isLoading, data: templates } = useFirestoreQuery(
    ['templates'],
    query(collection(firestore, 'templates')),
    {
      subscribe: true,
    },
    {
      // React Query data selector
      select(snapshot) {
        const templatesData = snapshot.docs.map((document) => ({
          label: document.data().title,
          value: document.data().title,
          description: document.data().description,
          id: document.id,
        }));
        return templatesData;
      },
    }
  );

  const defaultValues = {
    sendSmsOption: '',
    template: '',
    customMessage: '',
  };

  const {
    watch,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(YupErrorCheck),
  });

  if (isLoading) {
    return <div className="loading" />;
  }

  const sendSmsOption = watch('sendSmsOption');

  const onSubmit = async (data) => {
    if (data.sendSmsOption === 'Template') {
      const templateData = templates.filter((x) => x.label === data.template);
      const { description } = templateData[0];
      const newData = { message: description, mobileNumber: user.mobileNumber };
      sendSms(newData);
    } else {
      const newData = {
        message: data.customMessage,
        mobileNumber: user.mobileNumber,
      };
      sendSms(newData);
    }
    reset(defaultValues);
    setOpen(!open);
  };

  return (
    <>
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
                      onClick={() => setOpen(!open)}
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
                      ? format(
                          new Date(user.lastUpdated.toDate()),
                          'dd-MMM-yyyy'
                        )
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
                    <p>{user.start}</p>
                    {user.specificStartDate ? (
                      <p>
                        {format(
                          new Date(user.graduationYear.toDate()),
                          'dd-MMM-yyyy'
                        )}
                      </p>
                    ) : null}
                    {user.noticePeriod ? <p>{user.noticePeriod}</p> : null}
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
                  <dt className="col-sm-5">Area Of Interests</dt>
                  <dd className="col-sm-7">
                    {user.areaOfInterests
                      ? user.areaOfInterests.map((item, index) => (
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

      <Modal isOpen={open} toggle={toggleModal}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader toggle={toggleModal}>Send SMS</ModalHeader>
          <ModalBody>
            <SelectField
              label="Select One Option"
              name="sendSmsOption"
              control={control}
              options={messageOptions}
              errors={errors.sendSmsOption}
            />

            {sendSmsOption === 'Template' && (
              <SelectField
                label="Select one template"
                name="template"
                control={control}
                options={templates}
                errors={errors.template}
              />
            )}

            {sendSmsOption === 'Custom message' && (
              <TextInput
                name="customMessage"
                label="Please enter a custom message"
                control={control}
                errors={errors.customMessage}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              type="submit"
              disabled={user.hasCompletedProfile === false}
            >
              Send{' '}
            </Button>
            {user.hasCompletedProfile === false && (
              <p>Cannot send sms! User does not have mobile number </p>
            )}
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default UserProfile;
