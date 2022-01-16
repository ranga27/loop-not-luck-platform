/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getRoles } from '../../redux/roles/rolesSlice';
import RolesCarousel from './RolesCarousel';

const ViewRolesContainer = () => {
  const { roles } = useSelector((state) => state.roles);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const saveRole = (currentSlide) => {
    return new Promise((success) => {
      setTimeout(() => {
        success(`Saved: ${roles[currentSlide].title}`);
      }, 2000);
    });
  };
  const applyRole = async (currentSlide) => {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Message',
      inputPlaceholder: 'Type your Cover Letter here...',
      inputAttributes: {
        'aria-label': 'Type your Cover Letter here',
      },
      showCancelButton: true,
    });

    if (text) {
      Swal.fire(text);
    }
    return new Promise((success) => {
      setTimeout(() => {
        success(`Applied: ${roles[currentSlide].title}`);
      }, 2000);
    });
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
  return RolesCarousel(roles, saveRole, applyRole, seenRole);
};

export default ViewRolesContainer;
