/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'nuka-carousel';
import { getRoles } from '../../redux/actions';
import { CarouselItem } from '../../components/cards/CarouselItem';
import StateButton from '../../components/StateButton';

const ViewRolesContainer = () => {
  const { roles } = useSelector((state) => state.roles);
  const dispatch = useDispatch();
  const handleSuccessButtonClick = () => {
    return new Promise((success) => {
      setTimeout(() => {
        success('Everything went right!');
      }, 2000);
    });
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
      renderTopCenterControls={({ goToSlide, currentSlide }) => (
        <>
          {roles.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={
                currentSlide === index
                  ? 'glide__bullet slider-dot glide__bullet--active'
                  : 'glide__bullet slider-dot'
              }
              onClick={() => goToSlide(index)}
            />
          ))}
          <StateButton
            id="successButton"
            color="primary"
            className="mb-3"
            onClick={handleSuccessButtonClick}
          >
            Save
          </StateButton>
        </>
      )}
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
