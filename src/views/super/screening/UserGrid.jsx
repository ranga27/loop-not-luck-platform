import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import Modals from './Modal';
import IntlMessages from '../../../helpers/IntlMessages';
import StoreInUsestate, {
  getCandidateScreeningList,
  searchData,
} from '../../../helpers/Utils';

const UserGrid = ({ userRoles }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rolesData, setRoleData] = useState([]);

  const [searchInput, setSearchInput] = useState({});

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
    setFiltered(searchData(searchInput, getCandidateScreeningList(userRoles)));
  }, [searchInput]);

  return (
    <>
      <h2>Enter details for filter</h2>
      <div>
        <input
          placeholder="Name"
          name="userFullname"
          onChange={(e) => {
            StoreInUsestate.handleChange(e, setSearchInput);
          }}
        />
        <input
          placeholder="Email"
          name="email"
          onChange={(e) => {
            StoreInUsestate.handleChange(e, setSearchInput);
          }}
        />

        <input
          placeholder="Applied date"
          className="medium_input_search_field"
          type="date"
          name="appliedAt"
          onChange={(e) => {
            StoreInUsestate.handleChange(e, setSearchInput);
          }}
        />
        <input
          placeholder="Company"
          className="medium_input_search_field"
          name="company"
          onChange={(e) => {
            StoreInUsestate.handleChange(e, setSearchInput);
          }}
        />

        <input
          placeholder="Role"
          className="medium_input_search_field"
          name="roleTitle"
          onChange={(e) => {
            StoreInUsestate.handleChange(e, setSearchInput);
          }}
        />

        <input
          placeholder="Position"
          className="medium_input_search_field"
          name="positionType"
          onChange={(e) => {
            StoreInUsestate.handleChange(e, setSearchInput);
          }}
        />
        <input
          placeholder="Department"
          className="medium_input_search_field"
          name="department"
          onChange={(e) => {
            StoreInUsestate.handleChange(e, setSearchInput);
          }}
        />
        <input
          placeholder="Match %"
          className="small_input_search_field"
          name="score"
          onChange={(e) => {
            StoreInUsestate.handleChange(e, setSearchInput);
          }}
        />
      </div>
      <Row>
        {filtered.map((user) => (
          <Colxx xs="6" sm="4" xl="3" className="mb-4" key={user.recordId}>
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
