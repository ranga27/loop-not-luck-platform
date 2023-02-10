import React, { useState, useEffect } from 'react';
import { Button, Table } from 'reactstrap';
import Modals from './Modal';
import IntlMessages from '../../../helpers/IntlMessages';
import StoreInUsestate, {
  getCandidateScreeningList,
  searchData,
} from '../../../helpers/Utils';
import '../../../assets/css/sass/user.scss';

const UserTable = ({ userRoles }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rolesData, setRoleData] = useState([]);

  const [searchInput, setSearchInput] = useState({});
  console.log(searchInput);

  console.log(userRoles);
  const [filtered, setFiltered] = useState(
    getCandidateScreeningList(userRoles)
  );

  useEffect(() => {
    setFiltered(getCandidateScreeningList(userRoles));
  }, [userRoles]);

  const handleOpenModal = async (user) => {
    setRoleData(user);
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
          <tr>
            <th className="w-0.5 cusrom_row">
              <IntlMessages id="pages.applicant-id" />
            </th>
            <th className="w-0.5">
              <IntlMessages id="pages.application-name" />
            </th>
            <th className="w-0.5">
              <IntlMessages id="pages.application-email" />
            </th>
            <th className="w-0.5">
              <IntlMessages id="pages.application-applied-id" />
            </th>
            <th className="w-0.5">
              <IntlMessages id="pages.application-company" />
            </th>
            <th className="w-0.5">
              <IntlMessages id="pages.application-title" />
            </th>
            <th className="w-0.5">
              <IntlMessages id="pages.application-position" />
            </th>
            <th className="w-0.5">
              <IntlMessages id="pages.application-department" />
            </th>
            <th className="w-0.5">
              <IntlMessages id="pages.application-match" />
            </th>
          </tr>
          <tr>
            <td className="w-0.5">
              <input
                placeholder="Id"
                className="small_input_search_field"
                name="recordId"
                onChange={(e) => {
                  StoreInUsestate.handleChange(e, setSearchInput);
                }}
              />
            </td>
            <td>
              <input
                placeholder="Name"
                name="userFullname"
                onChange={(e) => {
                  StoreInUsestate.handleChange(e, setSearchInput);
                }}
              />
            </td>
            <td>
              <input
                placeholder="Email"
                name="email"
                onChange={(e) => {
                  StoreInUsestate.handleChange(e, setSearchInput);
                }}
              />
            </td>
            <td>
              <input
                placeholder="Applied date"
                className="medium_input_search_field"
                type="date"
                name="appliedAt"
                onChange={(e) => {
                  StoreInUsestate.handleChange(e, setSearchInput);
                }}
              />
            </td>
            <td>
              <input
                placeholder="Company"
                className="medium_input_search_field"
                name="company"
                onChange={(e) => {
                  StoreInUsestate.handleChange(e, setSearchInput);
                }}
              />
            </td>
            <td>
              <input
                placeholder="Role"
                className="medium_input_search_field"
                name="roleTitle"
                onChange={(e) => {
                  StoreInUsestate.handleChange(e, setSearchInput);
                }}
              />
            </td>
            <td>
              <input
                placeholder="Position"
                className="medium_input_search_field"
                name="positionType"
                onChange={(e) => {
                  StoreInUsestate.handleChange(e, setSearchInput);
                }}
              />
            </td>
            <td>
              <input
                placeholder="Department"
                className="medium_input_search_field"
                name="department"
                onChange={(e) => {
                  StoreInUsestate.handleChange(e, setSearchInput);
                }}
              />
            </td>
            <td>
              <input
                placeholder="Match %"
                className="small_input_search_field"
                name="score"
                onChange={(e) => {
                  StoreInUsestate.handleChange(e, setSearchInput);
                }}
              />
            </td>
          </tr>
        </thead>
        <tbody>
          {filtered.map((user) => (
            <tr key={user.recordId}>
              <td className="cusrom_row">{user.recordId}</td>
              <td>
                <Button color="link" onClick={() => handleOpenModal(user)}>
                  {user.userFullname}
                </Button>
              </td>
              <td className="w-0.5 ">{user.email}</td>
              <td>{user.appliedAt.toString()}</td>
              <td>{user.company}</td>
              <td>{user.roleTitle}</td>
              <td>{user.positionType}</td>
              <td>{user.department}</td>
              <td>{user.score}%</td>
            </tr>
          ))}
        </tbody>
      </Table>
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
export default UserTable;
