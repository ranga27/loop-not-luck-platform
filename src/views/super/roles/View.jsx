/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Badge,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Button,
} from 'reactstrap';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  collection,
  query,
  doc,
  where,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import {
  useFirestoreQuery,
  useFirestoreDocumentMutation,
} from '@react-query-firebase/firestore';
import { formatDateInArray } from '../../../helpers';
import useRoleStore from '../../../hooks/useRoleStore';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { TextInput } from '../../../components/form/FormFields';
import { firestore } from '../../../helpers/Firebase';
import {
  archiveRoleInUsersMatchedRoles,
  unArchiveRoleInUsersMatchedRoles,
} from '../../../helpers/firestoreService';

const YupErrorCheck = Yup.object().shape({
  reason: Yup.string()
    .max(100, 'Reason Too Long!')
    .required('Please enter the Title'),
  name: Yup.string()
    .max(100, 'Name Too Long!')
    .required('Please enter the Title'),
});

const ViewRole = () => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };
  const role = useRoleStore((state) => state.role);
  const mutation = useFirestoreDocumentMutation(
    doc(firestore, 'roles', role.id),
    {
      merge: true,
    }
  );
  const { isLoading, data: applicantList } = useFirestoreQuery(
    ['appliedRoles'],
    query(
      collection(firestore, 'appliedRoles'),
      where('roleId', '==', role.id)
    ),
    {
      subscribe: true,
    },
    {
      select(snapshot) {
        const userData = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
          recordId: `${document.data().userId.slice(-3)}${document
            .data()
            .roleId.slice(-2)}`.toUpperCase(),
        }));
        return formatDateInArray(userData);
      },
    }
  );

  const { isAllUsersLoading, data: usersList } = useFirestoreQuery(
    ['users'],
    query(
      collection(firestore, 'users'),
      where('role', '==', 'candidate'),
      orderBy('createdAt', 'desc')
    ),
    {
      subscribe: true,
    },
    {
      select(snapshot) {
        const userData = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));
        return formatDateInArray(userData);
      },
    }
  );

  const defaultValues = {
    name: '',
    reason: '',
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(YupErrorCheck),
  });

  const onSubmit = async (data) => {
    const updatePost = {
      reason: data.reason,
      archiverName: data.name,
      archived: true,
      updatedAt: serverTimestamp(),
    };
    mutation.mutate(updatePost, {
      async onSuccess() {
        Swal.fire(
          'Archived!',
          'Please wait for 2 minutes while we archive this role for all users matched to it.',
          'success'
        );
        await usersList.map((user) => {
          return archiveRoleInUsersMatchedRoles(role.id, user.id).then(() => {
            console.error('Running...');
          });
        });
      },
      onError(error) {
        Swal.fire('Oops!', 'Failed to archived role.', 'error');
        console.error(error);
      },
      onMutate() {
        console.info('Updating document...');
      },
    });

    reset(defaultValues);
    setOpen(!open);
  };

  const unarchiveRole = async () => {
    const updatePost = {
      archived: false,
      updatedAt: serverTimestamp(),
    };
    mutation.mutate(updatePost, {
      async onSuccess() {
        Swal.fire(
          'Archived!',
          'Please wait for 2 minutes while we archive this role for all users matched to it.',
          'success'
        );
        await usersList.map((user) => {
          return unArchiveRoleInUsersMatchedRoles(role.id, user.id).then(() => {
            console.log('Running...');
          });
        });
      },
      onError(error) {
        Swal.fire('Oops!', 'Failed to unarchive role.', 'error');
        console.error(error);
      },
      onMutate() {
        console.info('Updating document...');
      },
    });
  };

  if (isLoading || isAllUsersLoading) {
    return <div className="loading" />;
  }
  return (
    <>
      <div>
        <a href="/app/roles">
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
                    <img
                      src={role.logoUrl}
                      height="100"
                      width="100"
                      alt="logo"
                      className="me-2 rounded"
                    />
                  </div>
                </div>

                <h3 className="text-center mt-2 font--weight-bold text-primary">
                  {role.title}
                </h3>
                <h6 className="text-center text-muted text-small mt-2">
                  {role.company}
                </h6>
                <Row>
                  <div className="d-flex justify-content-center align-items-center flex-row">
                    {role.archived ? (
                      <div>
                        <h6 className="text-center text-muted text-small mt-2">
                          Role archived
                        </h6>
                        <br />
                        <small>By: {role.archiverName}</small>
                        <br />
                        <small>Reason: {role.reason}</small>

                        <Button
                          id="saveButton"
                          color="primary"
                          outline
                          className="slider-top-button text-small"
                          onClick={() => unarchiveRole()}
                        >
                          Unarchive Role
                        </Button>
                      </div>
                    ) : (
                      <Button
                        id="saveButton"
                        color="primary"
                        outline
                        className="slider-top-button text-small"
                        onClick={() => setOpen(!open)}
                      >
                        Archive Role
                      </Button>
                    )}
                  </div>
                </Row>
                <dl className="row list-unstyled mt-4">
                  <dt className="col-sm-7">Start Date</dt>
                  <dd className="col-sm-5">{role.startDate}</dd>
                  <hr />
                  <dt className="col-sm-7">Deadline</dt>
                  <dd className="col-sm-5">{role.deadline || 'Not Set'}</dd>
                  <hr />
                  <dt className="col-sm-7">Department</dt>
                  <dd className="col-sm-5">
                    {role.department ? role.department : 'Not set'}
                  </dd>
                  <hr />
                  <dt className="col-sm-7">Location</dt>
                  <dd className="col-sm-5">{role.location}</dd>
                  <hr />
                  <dt className="col-sm-7 mb-2">Position Type</dt>
                  <dd className="col-sm-5">{role.positionType}</dd>
                  <hr />
                  <dt className="col-sm-7 mb-2">Creation Date</dt>
                  <dd className="col-sm-5">{role.createdAt}</dd>
                  <hr />
                  <dt className="col-sm-7">Salary</dt>
                  <dd className="col-sm-5">{role.salary}</dd>
                  <hr />
                  <dt className="col-sm-7">Experience</dt>
                  <dd className="col-sm-5">
                    <p>{role.experience}</p>
                  </dd>
                  <hr />
                  <dt className="col-sm-7">Role Updated</dt>
                  <dd className="col-sm-5">{role.updatedAt}</dd>
                </dl>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx lg="8">
            <Card
              style={{ marginLeft: '0px', height: '400px', overflowY: 'auto' }}
            >
              <CardBody>
                <dl className="row list-unstyled">
                  <dt className="col-sm-5">Job Value</dt>
                  <dd className="col-sm-7">
                    {role.jobValues
                      ? role.jobValues.map((item, index) => (
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
                    {role.behaviourAttributesStrengths
                      ? role.behaviourAttributesStrengths.map((item, index) => (
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
                  <dt className="col-sm-5">Industry</dt>
                  <dd className="col-sm-7">
                    {role.industry
                      ? role.industry.map((item, index) => (
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
                    {role.technicalSkills
                      ? role.technicalSkills.map((item, index) => (
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
                    {role.areaOfInterests
                      ? role.areaOfInterests.map((item, index) => (
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
                    {role.rolesOfInterests
                      ? role.rolesOfInterests.map((item, index) => (
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
            <Card
              style={{
                marginTop: '20px',
                marginLeft: '0px',
                height: '400px',
                overflowY: 'auto',
              }}
            >
              <CardBody>
                <p style={{ fontWeight: 'bold' }}>Metrics</p>

                <p>Total: {applicantList.length}</p>
                <p>
                  Applicants Pending Review:{' '}
                  {
                    applicantList.filter(
                      (applicant) => applicant.status === 'Pending Review'
                    ).length
                  }
                </p>
                <p>
                  Accepted Applicants:{' '}
                  {
                    applicantList.filter(
                      (applicant) => applicant.status === 'Accepted'
                    ).length
                  }
                </p>
                <p>
                  Rejected Applicants:{' '}
                  {
                    applicantList.filter(
                      (applicant) => applicant.status === 'Rejected'
                    ).length
                  }
                </p>
                <Table
                  hover
                  className="sticky-top custom_table"
                  style={{
                    borderCollapse: 'separate',
                    borderSpacing: '0 20px',
                    overflowX: 'scroll !important',
                  }}
                >
                  <thead>
                    <tr style={{ fontWeight: 'bold' }}>
                      <td className="w-0.5">Applicant Name</td>
                      <td className="w-0.5">Applicant Email</td>
                      <td className="w-0.5">Applied At</td>
                      <td className="w-0.5">Match Score</td>
                      <td className="w-0.5 text-center">Status</td>
                    </tr>
                  </thead>
                  <tbody>
                    {applicantList?.length === 0 && (
                      <p>No applicants available!</p>
                    )}
                    {applicantList?.length > 0 &&
                      applicantList.map((user) => (
                        <tr key={user.id}>
                          <td>{user?.userFullName}</td>
                          <td>{user?.applicantEmail}</td>
                          <td className="text-center">{user?.appliedAt}</td>
                          <td>{user?.match}</td>
                          <td>{user?.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </div>
      <Modal isOpen={open} toggle={toggleModal}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader toggle={toggleModal}>Archive Role</ModalHeader>
          <ModalBody>
            <TextInput
              name="reason"
              label="Reason"
              control={control}
              errors={errors.reason}
            />

            <TextInput
              name="name"
              label="Full Name"
              control={control}
              errors={errors.name}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" disabled={role.archived}>
              Archive
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default ViewRole;
