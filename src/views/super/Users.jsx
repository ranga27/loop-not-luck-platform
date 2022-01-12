/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardSubtitle,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import Select from 'react-select';
import { useMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, updateRole } from '../../redux/actions';
import CustomSelectInput from '../../components/common/CustomSelectInput';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import ThumbnailLetters from '../../components/cards/ThumbnailLetters';
import Breadcrumb from '../../containers/navs/Breadcrumb';

const selectData = [
  { label: 'Super Admin', value: 'super', key: 0 },
  { label: 'Admin', value: 'admin', key: 1 },
  { label: 'Editor', value: 'editor', key: 2 },
  { label: 'Candidate', value: 'candidate', key: 3 },
  { label: 'Employer', value: 'employer', key: 4 },
];

const EditUsers = () => {
  const match = useMatch();
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);
  const [modalBasic, setModalBasic] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [userData, setUserData] = useState({});

  const onSubmitRole = async (user) => {
    const { uid, email } = user;
    const newRole = { role: selectedOption.value };
    dispatch(updateRole(uid, email, newRole));
  };

  const toggle = () => {
    setModalBasic(!modalBasic);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.users" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        {loading && <p>Loading...</p>}
        {users.length === 0 && !loading && <p>No users available!</p>}
        {error && !loading && <p>{error}</p>}
        {users.length > 0 &&
          users.map((item, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Colxx md="6" sm="6" lg="4" xxs="12" key={index}>
                <Card className="d-flex flex-row mb-4">
                  <ThumbnailLetters rounded text={item.email} className="m-4" />
                  <div className=" d-flex flex-grow-1 min-width-zero">
                    <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                      <div className="min-width-zero">
                        <CardSubtitle className="truncate mb-1">
                          {item.email}
                        </CardSubtitle>
                        <Badge color="danger" pill className="mb-1">
                          {item.role}
                        </Badge>
                        <br />
                        <Button
                          outline
                          size="xs"
                          color="primary"
                          onClick={() => {
                            setUserData(item);
                            setSelectedOption(
                              selectData.find(
                                (option) => option.value === item.role
                              )
                            );
                            toggle();
                          }}
                        >
                          Edit
                        </Button>
                        <Modal isOpen={modalBasic} toggle={toggle}>
                          <ModalHeader>Edit User</ModalHeader>
                          <ModalBody>
                            Current Role for {userData.email}:{' '}
                            <Badge color="danger" pill className="mb-1">
                              {userData.role}
                            </Badge>
                            <br /> Select new role:
                            <Colxx xxs="10" md="6" className="mb-5">
                              <Select
                                components={{ Input: CustomSelectInput }}
                                className="react-select"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={selectedOption}
                                onChange={setSelectedOption}
                                options={selectData}
                              />
                            </Colxx>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="primary"
                              onClick={() => {
                                setModalBasic(false);
                                onSubmitRole(userData);
                              }}
                            >
                              Submit
                            </Button>{' '}
                            <Button
                              color="secondary"
                              onClick={() => setModalBasic(false)}
                            >
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </div>
                    </CardBody>
                  </div>
                </Card>{' '}
              </Colxx>
            );
          })}
      </Row>
    </>
  );
};

export default EditUsers;
