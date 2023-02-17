import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardTitle, Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import StoreInUsestate, { searchData } from '../../../helpers/Utils';

const UserGrid = ({ userRoles }) => {
  const [searchInput, setSearchInput] = useState({
    match: '',
    department: '',
    positionType: '',
    roleTitle: '',
    company: '',
    applicantEmail: '',
    userFullName: '',
    recordId: '',
    appliedAt: '',
  });

  const clearSearch = () => {
    setSearchInput({
      match: '',
      department: '',
      positionType: '',
      roleTitle: '',
      company: '',
      applicantEmail: '',
      userFullName: '',
      recordId: '',
      appliedAt: '',
    });
  };

  const [filtered, setFiltered] = useState(userRoles);
  useEffect(() => {
    setFiltered(userRoles);
  }, [userRoles]);

  useEffect(() => {
    setFiltered(searchData(searchInput, userRoles));
  }, [searchInput]);

  return (
    <>
      <Row className="mb-3 w-60">
        <Colxx Colxx>
          <h2 className="mt-1">Enter details for filter</h2>
        </Colxx>
        <Colxx Colxx>
          <Button onClick={clearSearch}>Clear Filter</Button>
        </Colxx>
      </Row>
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          width: '98%',
        }}
      >
        <input
          placeholder="Name"
          name="userFullName"
          onChange={(e) => {
            StoreInUsestate.handleChange(e, setSearchInput);
          }}
        />
        <input
          placeholder="Email"
          name="applicantEmail"
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
          className="small_input_search_field z-20"
          name="match"
          onChange={(e) => {
            StoreInUsestate.handleChange(e, setSearchInput);
          }}
        />
      </div>
      <Row>
        {filtered.map((user) => (
          <Colxx
            xs="6"
            sm="4"
            xl="3"
            className="mb-4"
            key={user.recordId}
            style={{
              position: 'relative',
              zIndex: 2,
            }}
          >
            <Card key={user.id + user.match} className="mb-4">
              <CardBody>
                <div className="text-center">
                  <CardTitle className="truncate mb-1">
                    {user.userFullName}
                  </CardTitle>
                  <p className="truncate">{user.applicantEmail}</p>
                  <p>{user.company}</p>
                  <p> {user.match}%</p>
                  <Link
                    outline
                    size="xs"
                    color="primary"
                    to={`/app/screening/${user.userId}/${user.roleId}`}
                  >
                    <IntlMessages id="menu.view" />
                  </Link>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        ))}
      </Row>
    </>
  );
};
export default UserGrid;
