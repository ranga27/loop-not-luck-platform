/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
      renderCenterLeftControls={null}
      renderCenterRightControls={null}
      renderBottomCenterControls={null}
      renderTopLeftControls={({ previousSlide, currentSlide }) =>
        currentSlide !== 0 ? (
          <i
            onClick={previousSlide}
            className=" simple-icon-arrow-left carousel-nav"
          />
        ) : (
          ''
        )
      }
      renderTopRightControls={({ nextSlide, slideCount, currentSlide }) =>
        currentSlide !== slideCount - 1 ? (
          <i
            onClick={nextSlide}
            className="simple-icon-arrow-right carousel-nav"
          />
        ) : (
          ''
        )
      }
      renderTopCenterControls={({ goToSlide, currentSlide }) => (
        <>
          {roles.map((item, index) => (
            <button
              key={item.id}
              className={
                currentSlide === index
                  ? 'glide__bullet slider-dot glide__bullet--active'
                  : 'glide__bullet slider-dot'
              }
              onClick={() => goToSlide(index)}
            />
          ))}
        </>
      )}
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
