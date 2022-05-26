import React, { useState } from 'react';
import { Button, Table } from 'reactstrap';
import Modals from './Modal';
import IntlMessages from '../../../helpers/IntlMessages';

const UserTable = ({ userRoles }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rolesData, setRoleData] = useState([]);
  const handleOpenModal = async (role) => {
    setRoleData(role);
    setModalOpen(true);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
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
          {userRoles.map((role, index) => (
            <tr key={role.id}>
              <td>{index + 1}</td>
              <td>
                <Button color="link" onClick={() => handleOpenModal(role)}>
                  {role.userArray.firstName} {role.userArray.lastName}
                </Button>
              </td>
              <td>{role.userArray.email}</td>
              <td>{role.company}</td>
              <td>{role.positionType}</td>
              <td>{role.department}</td>
              <td>{role.score}%</td>
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
