/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { collection, doc, query } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useQuery } from 'react-query';
import { Card, CardBody } from 'reactstrap';
import { firestore } from '../../helpers/firebase';
import { updateRole } from '../../redux/roles/rolesSlice';
import RolesCarousel from './RolesCarousel';
import { formatDateInArray } from '../../helpers/utils';

const ViewRolesContainer = () => {
  const user = useQuery(['userAuth']);
  const { uid } = user.data;
  const rolesRef = query(collection(firestore, `users/${uid}/matchedRoles`));
  const { isLoading, data: roles } = useFirestoreQuery(
    ['matchedRoles'],
    rolesRef,
    {
      subscribe: true,
    },
    {
      // React Query data selector - TODO: refactor
      select(snapshot) {
        const rolesData = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));
        return formatDateInArray(rolesData);
      },
    }
  );

  const dispatch = useDispatch();

  const applyRole = async (currentSlide) => {};

  const seenRole = (currentSlide) => {
    console.log(`seen role: ${roles[currentSlide].title}`);
  };

  // TODO: add logic for no roles found
  if (isLoading) {
    return <div className="loading" />;
  }
  if (roles.length > 0) {
    // TODO: combine save, apply, seen actions
    return (
      <RolesCarousel roles={roles} applyRole={applyRole} seenRole={seenRole} />
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
