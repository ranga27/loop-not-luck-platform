import React, { useEffect, useState } from 'react';
import { Button, Table, Input } from 'reactstrap';
import Modals from './Modal';
import IntlMessages from '../../../helpers/IntlMessages';

const UserTable = ({ userRoles }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rolesData, setRoleData] = useState([]);
  const handleOpenModal = async (role, user) => {
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

  const [SearchTerms, setSearchTerms] = useState('');
  const [Profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (SearchTerms !== '') {
      setProfiles(
        userRoles.map((element) => {
          return {
            ...element,
            roles: element.roles.filter(
              (subElement) =>
                subElement.title.includes(SearchTerms) ||
                subElement.company.includes(SearchTerms)
            ),
          };
        })
      );
    } else {
      setProfiles(userRoles);
    }
  }, [userRoles, SearchTerms]);

  const onChangeSearch = (event) => {
    setSearchTerms(event.currentTarget.value);
  };
  return (
    <>
      <div>
        <div className=" bg-transparent  sticky-top p-4">
          <Input
            value={SearchTerms}
            onChange={onChangeSearch}
            placeholder="Search here..."
            className="px-5 py-3 relative rounded w-full"
          />
        </div>
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
          {Profiles.map((user) =>
            user.roles.map((role) => (
              <tr key={role.id}>
                <td>#</td>
                <td>
                  <Button
                    color="link"
                    onClick={() => handleOpenModal(role, user)}
                  >
                    {user.firstName} {user.lastName}
                  </Button>
                </td>
                <td>{user.email}</td>

                <td>{role.company}</td>
                <td>{role.title}</td>
                <td>{role.positionType}</td>
                <td>{role.department}</td>
                <td>{role.score}%</td>
              </tr>
            ))
          )}
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
