/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getRoles, updateRole } from '../../redux/roles/rolesSlice';
import RolesCarousel from './RolesCarousel';

const ViewRolesContainer = () => {
  const { roles } = useSelector((state) => state.roles);
  const { currentUser } = useSelector((state) => state.auth);
  const { uid } = currentUser;
  const dispatch = useDispatch();
  const saveRole = (currentSlide) => {
    const roleId = roles[currentSlide].id;
    const data = { saved: Date.now() };
    dispatch(updateRole({ uid, index: currentSlide, roleId, data }));
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
      const data = { applied: Date.now() };
      dispatch(updateRole({ uid, index: currentSlide, roleId, data }));
      Swal.fire('Email Sent');
    }
  };
  const seenRole = (currentSlide) => {
    console.log(`seen role: ${roles[currentSlide].title}`);
  };
  useEffect(() => {
    const fetchRoles = async () => {
      // TODO: avoid multiple firestore reads, keep role list updated via a listener
      // TODO: add logic for no roles found
      dispatch(getRoles(currentUser.uid));
    };
    fetchRoles();
  }, [dispatch, currentUser]);
  // TODO: combine save, apply, seen actions
  return RolesCarousel(roles, saveRole, applyRole, seenRole);
};

export default ViewRolesContainer;
