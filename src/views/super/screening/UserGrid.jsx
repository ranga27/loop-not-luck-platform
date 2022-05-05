import React, { useState } from 'react';
import { Button, Card, CardBody, CardTitle, Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import Modals from './Modal';
import IntlMessages from '../../../helpers/IntlMessages';

const UserGrid = ({ userRoles }) => {
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
      <Row>
        {userRoles.map((role) => {
          return (
            <Colxx xs="6" sm="4" xl="3" className="mb-4" key={role.id}>
              <Card key={role.id} className="mb-4">
                <CardBody>
                  <div className="text-center">
                    <CardTitle className="truncate mb-1">
                      {role.userArray.firstName} {role.userArray.lastName}
                    </CardTitle>
                    <p className="truncate">{role.userArray.email}</p>
                    <p>{role.company}</p>
                    <p> {role.score}%</p>
                    <Button
                      outline
                      size="xs"
                      color="primary"
                      onClick={() => handleOpenModal(role)}
                    >
                      <IntlMessages id="menu.view" />
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Colxx>
          );
        })}
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
