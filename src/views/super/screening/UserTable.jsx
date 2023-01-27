import React, { useState, useEffect } from 'react';
import { Button, Table } from 'reactstrap';
import Modals from './Modal';
import IntlMessages from '../../../helpers/IntlMessages';
import {
  getCandidateScreeningList,
  sortScreeningUserList,
} from '../../../helpers/Utils';

const UserTable = ({ userRoles }) => {
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

  const handleOpenModal = async (user, role) => {
    const mergedArray = {
      ...user,
      ...role,
    };
    setRoleData(mergedArray);
    setModalOpen(true);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    const tempArr = sortScreeningUserList(filtered, select);
    setFiltered(tempArr);
  }, [select, toggle]);

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
      <Table responsive hover className="sticky-top">
        <thead>
          <tr>
            <th>
              <IntlMessages id="pages.application-tableIndex" />
            </th>
            <th>
              <IntlMessages id="pages.application-name" />
            </th>
            <th>
              <IntlMessages id="pages.application-email" />
            </th>
            <th>
              <IntlMessages id="pages.application-company" />
            </th>
            <th>
              <IntlMessages id="pages.application-title" />
            </th>
            <th>
              <IntlMessages id="pages.application-position" />
            </th>
            <th>
              <IntlMessages id="pages.application-department" />
            </th>
            <th>
              <IntlMessages id="pages.application-match" />
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((user) => (
            <tr key={user.id}>
              <td>#</td>
              <td>
                <Button
                  color="link"
                  onClick={() => handleOpenModal(user.role, user)}
                >
                  {user.userFullname}
                </Button>
              </td>
              <td>{user.email}</td>

              <td>{user.company}</td>
              <td>{user.positionType}</td>
              <td>{user.department}</td>
              <td>{user.score}%</td>
              <td>{user.department}</td>
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
