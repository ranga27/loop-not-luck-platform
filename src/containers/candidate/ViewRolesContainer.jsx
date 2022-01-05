/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'nuka-carousel';
import { getRoles, selectedRole } from '../../redux/actions';
import { CarouselItem } from '../../components/cards/CarouselItem';
import './styles.scss';

const ViewRolesContainer = () => {
  const { roles } = useSelector((state) => state.roles);
  const dispatch = useDispatch();
  const selectRole = (role) => {
    // TODO: Use better name for selectedRole
    dispatch(selectedRole(role));
  };
  useEffect(() => {
    const fetchRoles = async () => {
      // TODO: avoid multiple firestore reads, keep role list updated via a listener
      // TODO: add logic for no roles found
      dispatch(getRoles());
    };
    fetchRoles();
  }, [dispatch]);
  return (
    <Carousel
      enableKeyboardControls={true}
      renderCenterLeftControls={({ previousSlide, currentSlide }) =>
        currentSlide !== 0 ? (
          <i onClick={previousSlide} className=" simple-icon-arrow-left" />
        ) : (
          ''
        )
      }
    >
      {roles.map((item, index) => (
        <div key={item.id}>
          <CarouselItem {...item} />
        </div>
      ))}
    </Carousel>
  );
};

export default ViewRolesContainer;
