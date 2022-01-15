/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoles } from '../../redux/actions';
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
  const applyRole = (currentSlide) => {
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
