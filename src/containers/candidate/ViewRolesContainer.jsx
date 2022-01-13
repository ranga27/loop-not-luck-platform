/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'nuka-carousel';
import { getRoles } from '../../redux/actions';
import { CarouselItem } from '../../components/cards/CarouselItem';
import { renderTopCenterControls } from './renderTopCenterControls';

const ViewRolesContainer = () => {
  const { roles } = useSelector((state) => state.roles);
  const { currentUser } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const handleSaveButtonClick = (currentSlide) => {
    return new Promise((success) => {
      setTimeout(() => {
        success(`Saved: ${roles[currentSlide].title}`);
      }, 2000);
    });
  };
  const handleApplyButtonClick = (currentSlide) => {
    return new Promise((success) => {
      setTimeout(() => {
        success(`Applied: ${roles[currentSlide].title}`);
      }, 2000);
    });
  };
  useEffect(() => {
    const fetchRoles = async () => {
      // TODO: avoid multiple firestore reads, keep role list updated via a listener
      // TODO: add logic for no roles found
      dispatch(getRoles(currentUser.uid));
    };
    fetchRoles();
  }, [dispatch, currentUser]);
  return (
    <Carousel
      enableKeyboardControls
      renderCenterLeftControls={null}
      renderCenterRightControls={null}
      renderBottomCenterControls={null}
      renderTopLeftControls={({ previousSlide, currentSlide }) =>
        currentSlide !== 0 ? (
          <i
            role="link"
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
            role="link"
            onClick={nextSlide}
            className="simple-icon-arrow-right carousel-nav"
          />
        ) : (
          ''
        )
      }
      renderTopCenterControls={({ goToSlide, currentSlide }) =>
        renderTopCenterControls(
          roles,
          currentSlide,
          goToSlide,
          handleSaveButtonClick,
          handleApplyButtonClick
        )
      }
    >
      {roles.map((item) => (
        <div key={item.id}>
          <CarouselItem {...item} />
        </div>
      ))}
    </Carousel>
  );
};

export default ViewRolesContainer;
