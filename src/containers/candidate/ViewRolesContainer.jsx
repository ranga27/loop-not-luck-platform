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
import { unSaveRole, updateRole } from '../../redux/roles/rolesSlice';
import formatDate from './formatDate';
import RolesCarousel from './RolesCarousel';

const ViewRolesContainer = () => {
  const user = useQuery(['userAuth']);
  const { uid } = user.data;
  const rolesCollection = collection(firestore, `users/${uid}/matchedRoles`);
  const rolesRef = query(rolesCollection);
  const { isLoading, data: roles } = useFirestoreQuery(
    ['matchedRoles'],
    rolesRef,
    {
      subscribe: true,
    },
    {
      // React Query data selector
      select(snapshot) {
        const rolesData = snapshot.docs.map((document) => ({
          ...document.data().data,
          id: document.id,
        }));
        return formatDate(rolesData);
      },
    }
  );

  const dispatch = useDispatch();

  const saveRole = async (currentSlide) => {
    const roleId = roles[currentSlide].id;
    const data = { saved: Date.now() };
    if (roles[currentSlide]?.saved) {
      dispatch(unSaveRole({ uid, index: currentSlide, roleId }));
    } else dispatch(updateRole({ uid, index: currentSlide, roleId, data }));
  };

  const applyRole = async (currentSlide) => {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Please type your cover letter',
      inputPlaceholder: 'Type your Cover Letter here...',
      inputAttributes: {
        'aria-label': 'Type your Cover Letter here',
      },
      showCancelButton: true,
    });

    if (text) {
      const roleId = roles[currentSlide].id;
      const data = { applied: Date.now(), coverLetter: text };
      dispatch(updateRole({ uid, index: currentSlide, roleId, data }));
      Swal.fire('Email Sent');
    }
  };

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
      <RolesCarousel
        roles={roles}
        saveRole={saveRole}
        applyRole={applyRole}
        seenRole={seenRole}
      />
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
