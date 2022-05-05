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
  Form,
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import { DatePicker, TextInput } from '../../../components/form/FormFields';
import { sendCandidateFeedbackEmail } from '../../../helpers/firebaseService';
import IntlMessages from '../../../helpers/IntlMessages';

const Modals = ({ modalOpen, rolesData, setModalOpen, toggle }) => {
  const getDate = (date) => {
    if (date) {
      const dateStr = new Date(date.seconds * 1000);
      return dateStr.toDateString();
    }
    return 'N/A';
  };

  const [collapse, setCollapse] = useState(false);
  const [preview, setPreview] = useState(false);
  const defaultValues = {
    subject: '',
    body: '',
    prescreeningDate: null,
    calendyLink: '',
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {
    const name = `${rolesData.userArray.firstName} ${rolesData.userArray.lastName}`;
    const email = `${rolesData.userArray.email}`;

    if (rolesData.prescreening === true) {
      const date = data.prescreeningDate.toLocaleDateString();
      const newData = { ...data, name, email, date };
      console.log('SUBMIT WITH PRESCREENING: ', newData);
      await sendCandidateFeedbackEmail(newData);
    } else {
      const newData = { ...data, name, email };
      console.log('SUBMIT: ', newData);
      await sendCandidateFeedbackEmail(newData);
    }
    setModalOpen(false);
    reset(defaultValues);
  };

  return (
    <Modal isOpen={modalOpen} toggle={toggle} className="modal-lg">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>{rolesData.fullName} Application</ModalHeader>
        <ModalBody>
          <ListGroup>
            <ListGroupItem>
              <ListGroupItemHeading className="text-primary text-center mt-3 mb-4">
                <IntlMessages id="pages.application-applicantInfo" />
              </ListGroupItemHeading>

              <dl className="row list-unstyled">
                <dt className="col-sm-3">Full Name</dt>
                <dd className="col-sm-9">
                  {rolesData.userArray.firstName} {rolesData.userArray.lastName}
                </dd>
                <dt className="col-sm-3 text-truncate">Email</dt>
                <dd className="col-sm-9">{rolesData.userArray.email}</dd>
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
                  <dd className="col-sm-9">
                    {rolesData.userArray.degreeSubject}
                  </dd>
                  <dt className="col-sm-3 text-truncate">Phone number</dt>
                  <dd className="col-sm-9">
                    {rolesData.userArray.mobileNumber}
                  </dd>
                  <dt className="col-sm-3 text-truncate">Gender</dt>
                  <dd className="col-sm-9">{rolesData.userArray.gender}</dd>
                  <dt className="col-sm-3 text-truncate">Gender (Other)</dt>
                  <dd className="col-sm-9">
                    {rolesData.userArray.genderOther}
                  </dd>
                  <dt className="col-sm-3 text-truncate">Ethnicity</dt>
                  <dd className="col-sm-9">{rolesData.userArray.ethnicity}</dd>
                  <dt className="col-sm-3 text-truncate">Ethnicity (Other)</dt>
                  <dd className="col-sm-9">
                    {rolesData.userArray.ethnicityOther}
                  </dd>
                  <dt className="col-sm-3 text-truncate">Disability</dt>
                  <dd className="col-sm-9">{rolesData.userArray.disability}</dd>
                  <dt className="col-sm-3 text-truncate">
                    Disability (if exists)
                  </dt>
                  <dd className="col-sm-9">
                    {rolesData.userArray.disabilityAnswer}
                  </dd>
                  <dt className="col-sm-3 text-truncate">Diversity</dt>
                  <dd className="col-sm-9">
                    {rolesData.userArray.diversity
                      ? rolesData.userArray.diversity.map((item) => (
                          <Badge key={item}>{item}</Badge>
                        ))
                      : null}
                  </dd>
                  <dt className="col-sm-3 text-truncate">
                    Roles Interested In
                  </dt>
                  <dd className="col-sm-9">
                    {rolesData.userArray.rolesInterestedIn
                      ? rolesData.userArray.rolesInterestedIn.map((item) => (
                          <Badge key={item}>{item}</Badge>
                        ))
                      : null}
                  </dd>
                  <dt className="col-sm-3 text-truncate">Interests</dt>
                  <dd className="col-sm-9">
                    {rolesData.userArray.interests
                      ? rolesData.userArray.interests.map((item) => (
                          <Badge key={item}>{item}</Badge>
                        ))
                      : null}
                  </dd>
                  <dt className="col-sm-3 text-truncate">Is Visa Required</dt>
                  <dd className="col-sm-9">
                    {rolesData.userArray.visaRequired}
                  </dd>
                  <dt className="col-sm-3 text-truncate">Graduation Year</dt>
                  <dd className="col-sm-9">
                    {getDate(rolesData.userArray.graduationYear)}
                  </dd>
                  <dt className="col-sm-3 text-truncate">Start date</dt>
                  <dd className="col-sm-9">
                    {getDate(rolesData.userArray.start)}
                  </dd>
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
                <dt className="col-sm-3">Organisation</dt>
                <dd className="col-sm-9">{rolesData.organisation}</dd>
                <dt className="col-sm-3">Company</dt>
                <dd className="col-sm-9">{rolesData.company}</dd>
                <dt className="col-sm-3 text-truncate">Location</dt>
                <dd className="col-sm-9">{rolesData.location}</dd>
                <dt className="col-sm-3 text-truncate">Job Title</dt>
                <dd className="col-sm-9">{rolesData.title}</dd>
                <dt className="col-sm-3">Department</dt>
                <dd className="col-sm-9">{rolesData.department}</dd>
                <dt className="col-sm-3 text-truncate">Qualification</dt>
                <dd className="col-sm-9">{rolesData.qualification}</dd>
                <dt className="col-sm-3"> Role Description</dt>
                <dd className="col-sm-9">{rolesData.description}</dd>
                <dt className="col-sm-3 text-truncate"> Position Type</dt>
                <dd className="col-sm-9">{rolesData.positionType}</dd>
                <dt className="col-sm-3 text-truncate">How To Apply</dt>
                <dd className="col-sm-9">{rolesData.howToApply}</dd>
                <dt className="col-sm-3 text-truncate">Website</dt>
                <dd className="col-sm-9">{rolesData.website}</dd>
                <dt className="col-sm-3 text-truncate">Rolling</dt>
                {rolesData.rolling === true ? (
                  <dd className="col-sm-9">Yes</dd>
                ) : (
                  <dd className="col-sm-9">No</dd>
                )}{' '}
                <dt className="col-sm-3 text-truncate">Published</dt>
                {rolesData.publish === true ? (
                  <dd className="col-sm-9">Yes</dd>
                ) : (
                  <dd className="col-sm-9">No</dd>
                )}
                <dt className="col-sm-3 text-truncate">Creation Date</dt>
                <dd className="col-sm-9">{rolesData.createdAt}</dd>
                {/* <dt className="col-sm-3 text-truncate">Deadline</dt>
              <dd className="col-sm-9">{rolesData.deadline}</dd>
              <dt className="col-sm-3 text-truncate">Start Date</dt>
              <dd className="col-sm-9">{rolesData.startDate}</dd> */}
                <dt className="col-sm-3 text-truncate">
                  Requires cover letter
                </dt>
                {rolesData.coverLetter === true ? (
                  <dd className="col-sm-9">Yes</dd>
                ) : (
                  <dd className="col-sm-9">No</dd>
                )}
                <dt className="col-sm-3 text-truncate">Roles Of Interests</dt>
                <dd className="col-sm-9">
                  {rolesData.rolesOfInterests
                    ? rolesData.rolesOfInterests.map((item) => (
                        <Badge key={item}>{item}</Badge>
                      ))
                    : null}
                </dd>
                <dt className="col-sm-3 text-truncate">
                  Behaviour Attributes Strengths
                </dt>
                <dd className="col-sm-9">
                  {rolesData.behaviourAttributesStrengths
                    ? rolesData.behaviourAttributesStrengths.map((item) => (
                        <Badge key={item}>{item}</Badge>
                      ))
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
                  <a
                    href={rolesData.userArray.cvUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <IntlMessages id="pages.application-cv" />
                  </a>
                </dd>
                <dt className="col-sm-3 text-truncate">CV Uploaded at</dt>
                <dd className="col-sm-9">
                  {getDate(rolesData.userArray.cvUploadDate)}
                </dd>
                <dt className="col-sm-3 text-truncate">Prescreening</dt>
                {rolesData.prescreening === true ? (
                  <dd className="col-sm-9">
                    <IntlMessages id="pages.application-requiresPrescreening" />
                  </dd>
                ) : (
                  <dd className="col-sm-9">
                    {' '}
                    <IntlMessages id="pages.application-noRequiresPrescreening" />
                  </dd>
                )}
              </dl>

              {rolesData.prescreening === true ? (
                <>
                  <h5>
                    <IntlMessages id="pages.application-scheduleDate" />
                  </h5>

                  <DatePicker
                    label="Prescreening Date"
                    name="prescreeningDate"
                    control={control}
                    errors={errors.prescreeningDate}
                  />
                  <TextInput
                    name="subject"
                    label="Email Subject"
                    control={control}
                    errors={errors.subject}
                  />
                  <TextInput
                    name="body"
                    label="Email Body"
                    type="textarea"
                    control={control}
                  />

                  <TextInput
                    name="calendyLink"
                    label="Enter a Calendy Link"
                    control={control}
                  />
                </>
              ) : (
                <>
                  <h5>
                    {' '}
                    <IntlMessages id="pages.application-request" />
                  </h5>

                  <TextInput
                    name="subject"
                    label="Email Subject"
                    control={control}
                    errors={errors.subject}
                  />
                  <TextInput
                    name="body"
                    label="Email Body"
                    type="textarea"
                    control={control}
                  />
                </>
              )}

              <div>
                {preview ? (
                  <Button onClick={() => setPreview(!preview)} color="link">
                    <IntlMessages id="menu.close" />
                  </Button>
                ) : (
                  <Button onClick={() => setPreview(!preview)} color="link">
                    <IntlMessages id="pages.application-preview" />
                  </Button>
                )}

                <Modal isOpen={preview}>
                  <ModalHeader>
                    <IntlMessages id="pages.application-prescreenPreview" />
                  </ModalHeader>
                  <ModalBody>
                    {' '}
                    {/* eslint no-underscore-dangle: 0 */}
                    <h2 className="text-center">
                      {control._formValues.subject}
                    </h2>
                    <p>{control._formValues.body}</p>
                    <Button color="link">
                      {control._formValues.calendyLink}
                    </Button>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={() => setPreview(!preview)}
                    >
                      <IntlMessages id="pages.application-done" />
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
            </ListGroupItem>
          </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            <IntlMessages id="pages.application-send" />
          </Button>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default Modals;
