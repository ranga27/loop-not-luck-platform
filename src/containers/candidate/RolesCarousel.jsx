/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Carousel from 'nuka-carousel';
import { CarouselItem } from '../../components/cards/CarouselItem';
import { renderTopCenterControls } from './renderTopCenterControls';

const RolesCarousel = ({ roles, saveRole, applyRole, seenRole }) => {
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
            onClick={() => {
              nextSlide();
              seenRole(currentSlide);
            }}
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
          saveRole,
          applyRole
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

export default RolesCarousel;
