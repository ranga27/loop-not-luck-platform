/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Card, CardBody } from 'reactstrap';
import CombinedRoles from './CombinedRoles';
// import RolesCarousel from './RolesCarousel';

const ViewRolesContainer = ({
  isLoading,
  roles,
  // otherRoles,
  // topMatch,
  loadActiveTab,
}) => {
  // TODO: add logic for no roles found
  if (isLoading) {
    return <div className="loading" />;
  }

  if (roles.length > 0) {
    return (
      // TODO: For now using ./CombinedRoles, in upcoming update will switch to ./RolesCarousel
      <CombinedRoles roles={roles} loadActiveTab={loadActiveTab} />

      // <RolesCarousel
      //   roles={roles}
      //   otherRoles={otherRoles}
      //   topMatch={topMatch}
      //   loadActiveTab={loadActiveTab}
      // />
    );
  }

  return (
    <div>
      <Card>
        <CardBody>
          <h3>Sorry, no roles for you yet</h3>
        </CardBody>
      </Card>
    </div>
  );
};

export default ViewRolesContainer;
