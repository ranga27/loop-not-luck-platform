/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import Carousel from 'nuka-carousel';
import { Row, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { Colxx } from '../../components/common/CustomBootstrap';
import CarouselCardLeft from '../../components/cards/CarouselCardLeft';
import CarouselCardRight from '../../components/cards/CarouselCardRight';
import MoreRolesCarousel from './MoreRolesCarousel';

const RolesCarousel = ({ roles, otherRoles, topMatch }) => {
  const seenRole = (currentSlide) => {
    console.log(`seen role: ${roles[currentSlide].title}`);
  };
  const [currentActiveTab, setCurrentActiveTab] = useState('1');

  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({
              active: currentActiveTab === '1',
            })}
            onClick={() => {
              toggle('1');
            }}
          >
            Recommended Roles
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: currentActiveTab === '2',
            })}
            onClick={() => {
              toggle('2');
            }}
          >
            Other Roles
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={currentActiveTab}>
        <TabPane tabId="1">
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
            renderCenterRightControls={({
              nextSlide,
              slideCount,
              currentSlide,
            }) =>
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
        </TabPane>
        <TabPane tabId="2">
          <MoreRolesCarousel otherRoles={otherRoles} />
        </TabPane>
      </TabContent>
    </>
  );
};

export default RolesCarousel;
