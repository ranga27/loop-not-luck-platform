import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import Modals from './Modal';
import IntlMessages from '../../../helpers/IntlMessages';
import {
  getCandidateScreeningList,
  sortScreeningUserList,
} from '../../../helpers/Utils';

const UserGrid = ({ userRoles }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rolesData, setRoleData] = useState([]);
  const [select, setSelect] = useState('');
  const [toggle, setToggle] = useState(false);
  const [filtered, setFiltered] = useState(
    getCandidateScreeningList(userRoles)
  );

  useEffect(() => {
    setFiltered(getCandidateScreeningList(userRoles));
  }, [userRoles]);

  const handleOpenModal = async (user) => {
    setRoleData(user.combined);
    setModalOpen(true);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    const tempArr = sortScreeningUserList(filtered, select);
    setFiltered(tempArr);
  }, [select, toggle, filtered]);

  return (
    <>
      <div>
        <select
          onChange={(e) => {
            setSelect(e.target.value);
          }}
          className="m-3"
        >
          <option value="random">Choose Filter</option>
          <option value="company">Filter by Company Name</option>
          <option value="role">Filter by Role Name</option>
          <option value="score">Filter by Matched Score %</option>
        </select>
        <Button
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          Filter
        </Button>
      </div>

      <Row>
        {filtered.map((user) => (
          <Colxx
            xs="6"
            sm="4"
            xl="3"
            className="mb-4"
            key={user.id + user.score}
          >
            <Card key={user.id + user.score} className="mb-4">
              <CardBody>
                <div className="text-center">
                  <CardTitle className="truncate mb-1">
                    {user.userFullname}
                  </CardTitle>
                  <p className="truncate">{user.email}</p>
                  <p>{user.company}</p>
                  <p> {user.score}%</p>
                  <Button
                    outline
                    size="xs"
                    color="primary"
                    onClick={() => handleOpenModal(user)}
                  >
                    <IntlMessages id="menu.view" />
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        ))}
      </Row>

      {modalOpen && (
        <Modals
          modalOpen={modalOpen}
          rolesData={rolesData}
          setModalOpen={setModalOpen}
          toggle={toggleModal}
        />
      )}
    </>
  );
};
export default UserGrid;
