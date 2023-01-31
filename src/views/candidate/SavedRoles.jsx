import React, { useState } from 'react';
import { collection, query, where } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { Card, CardBody, Row } from 'reactstrap';
import { useQuery } from 'react-query';
import { Colxx } from '../../components/common/CustomBootstrap';
import { firestore } from '../../helpers/Firebase';
import { formatDateInArray, getDaysToDeadline } from '../../helpers/Utils';
import SavedRoleCard from '../../components/cards/SavedRoleCard';
import ExpiredRoleCard from '../../components/cards/ExpiredRoleCard';
import QuestionPopup from '../../components/QuestionPopup';

const SavedRoles = () => {
  const user = useQuery(['userAuth']);
  const { uid } = user.data;
  const todaysDate = new Date();
  const [
    questionInqueryModelForSavedRole,
    setQuestionInqueryModelForSavedRole,
  ] = useState(false);

  const modelToggleForSavedRole = () =>
    setQuestionInqueryModelForSavedRole(!questionInqueryModelForSavedRole);

  const [currentSelectedRole, setCurrentSelectedRole] = useState(null);

  const { isLoading, data: savedRoles } = useFirestoreQuery(
    ['savedRoles'],
    query(
      collection(firestore, `users/${uid}/companyMatchedRoles`),
      where('saved', '==', true)
    ),
    {
      subscribe: true,
    },
    {
      // React Query data selector
      select(snapshot) {
        const rolesData = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
          daysToDeadline: getDaysToDeadline(document.data().deadline),
        }));
        return formatDateInArray(rolesData);
      },
    }
  );
  if (isLoading) {
    return <div className="loading" />;
  }

  if (savedRoles.length > 0) {
    const liveRoles = [];
    const expiredRoles = [];
    savedRoles.forEach((role) => {
      const roleDeadline = new Date(role.deadline);
      if (roleDeadline > todaysDate) liveRoles.push(role);
      else expiredRoles.push(role);
    });
    return (
      <>
        <Row>
          <h3 style={{ fontWeight: 'bold' }} className="">
            Live Roles
          </h3>
          {liveRoles.map((role) => {
            return (
              <Colxx lg="6" className="pt-4" key={role.id}>
                <SavedRoleCard
                  role={role}
                  setCurrentSelectedRole={setCurrentSelectedRole}
                  setQuestionInqueryModelForSavedRole={
                    setQuestionInqueryModelForSavedRole
                  }
                />
              </Colxx>
            );
          })}
        </Row>
        <Row>
          <h3 style={{ fontWeight: 'bold' }} className="pt-4">
            Expired Roles
          </h3>
          {expiredRoles.map((role) => {
            return (
              <Colxx lg="6" className="pt-4 pb-5 mb-5" key={role.id}>
                <ExpiredRoleCard role={role} />
              </Colxx>
            );
          })}
        </Row>
        <QuestionPopup
          open={questionInqueryModelForSavedRole}
          modelToggle={modelToggleForSavedRole}
          userUid={uid}
          selectedRoleData={currentSelectedRole}
        />
      </>
    );
  }
  return (
    <div>
      <Card>
        <CardBody>
          <h3>Sorry, no saved roles for you yet</h3>
        </CardBody>
      </Card>
    </div>
  );
};

export default SavedRoles;
