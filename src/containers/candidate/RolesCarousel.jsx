/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import Carousel from 'nuka-carousel';
import { Row, Collapse, Button } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
import CarouselCardLeft from '../../components/cards/CarouselCardLeft';
import CarouselCardRight from '../../components/cards/CarouselCardRight';
import MoreRolesCarousel from './MoreRolesCarousel';

const RolesCarousel = ({ roles, otherRoles, topMatch }) => {
  const seenRole = (currentSlide) => {
    console.log(`seen role: ${roles[currentSlide].title}`);
  };
  const [collapse, setCollapse] = useState(false);

  return (
    <>
      <Carousel
        dragging={false}
        disableKeyboardControls
        renderCenterLeftControls={({ previousSlide, currentSlide }) =>
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
        renderCenterRightControls={({ nextSlide, slideCount, currentSlide }) =>
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
        renderBottomCenterControls={null}
      >
        {topMatch.map((item) => (
          <div key={item.id}>
            <Row md="2">
              <Colxx lg="7">
                <CarouselCardLeft role={item} />
              </Colxx>
              <Colxx lg="5">
                <CarouselCardRight role={item} />
              </Colxx>
            </Row>
          </div>
        ))}
      </Carousel>

      <div className="mt-5">
        {collapse ? (
          <div>
            <Button
              onClick={() => setCollapse(!collapse)}
              color="link"
              style={{
                color: 'black',
                fontSize: '20px',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              More roles
            </Button>
            <span className="">
              <i
                className="simple-icon-arrow-up"
                style={{
                  fontWeight: 'bold',
                  fontSize: '15px',
                }}
              />
            </span>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => setCollapse(!collapse)}
              color="link"
              style={{
                color: 'black',
                fontSize: '20px',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              More roles
            </Button>
            <span className="">
              <i
                className="simple-icon-arrow-down"
                style={{
                  fontWeight: 'bold',
                  fontSize: '15px',
                }}
              />
            </span>
          </div>
        )}
      </div>
      <Collapse isOpen={collapse}>
        <MoreRolesCarousel otherRoles={otherRoles} />
      </Collapse>
    </>
  );
};

export default RolesCarousel;
