/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoles, selectedRole } from '../../redux/actions';
import GlideComponent from '../../components/carousel/GlideComponent';
import { items } from './carouselItems';
import { SingleCarouselItem } from '../../components/carousel/SingleCarouselItem';

const ViewRolesContainer = () => {
  const { roles } = useSelector((state) => state.roles);
  const dispatch = useDispatch();
  const selectRole = (role) => {
    // TODO: Use better name for selectedRole
    dispatch(selectedRole(role));
  };
  useEffect(() => {
    const fetchRoles = async () => {
      // TODO: avoid multiple firestore reads, keep role list updated via listener
      dispatch(getRoles());
    };
    fetchRoles();
  }, [dispatch]);
  return (
    <GlideComponent
      settings={{
        gap: 5,
        perView: 1,
        type: 'carousel',
      }}
    >
      {items.map((item) => {
        return (
          <div key={item.id}>
            <SingleCarouselItem {...item} />
          </div>
        );
      })}
    </GlideComponent>
  );
};

export default ViewRolesContainer;
