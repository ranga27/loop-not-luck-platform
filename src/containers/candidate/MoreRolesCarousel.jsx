/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Row } from 'reactstrap';
import Carousel from 'nuka-carousel';
import { Colxx } from '../../components/common/CustomBootstrap';
import CarouselCardLeft from '../../components/cards/CarouselCardLeft';
import CarouselCardRight from '../../components/cards/CarouselCardRight';

const MoreRolesCarousel = ({ otherRoles }) => {
  const seenRole = (currentSlide) => {
    console.log(`seen role: ${otherRoles[currentSlide].title}`);
  };
  return (
    <Carousel
      dragging={false}
      enableKeyboardControls
      renderCenterLeftControls={({ previousSlide, currentSlide }) =>
        currentSlide !== 0 ? (
          <i
            role="link"
            onClick={previousSlide}
            className=" simple-icon-arrow-left carousel-left-nav"
          />
        ) : (
          ''
        )
      }
      renderCenterRightControls={({ nextSlide, slideCount, currentSlide }) =>
        currentSlide !== slideCount - 1 ? (
          <i
            role="link"
            onClick={() => {
              nextSlide();
              seenRole(currentSlide);
            }}
            className="simple-icon-arrow-right carousel-right-nav"
          />
        ) : (
          ''
        )
      }
      renderBottomCenterControls={null}
    >
      {otherRoles.map((item) => (
        <div key={item.id}>
          <Row md="2">
            <Colxx>
              <CarouselCardLeft role={item} />
            </Colxx>
            <Colxx>
              <CarouselCardRight role={item} />
            </Colxx>
          </Row>
        </div>
      ))}
    </Carousel>
  );
};

export default MoreRolesCarousel;
