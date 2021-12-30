/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, { Keyboard, Pagination, Navigation } from 'swiper';
import { useDispatch, useSelector } from 'react-redux';
import { getRoles, selectedRole } from '../../redux/actions';
import GlideComponent from '../../components/carousel/GlideComponent';
import { items } from './carouselItems';
import { SingleCarouselItem } from '../../components/carousel/SingleCarouselItem';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/navigation/navigation.min.css';

import './styles.css';

// install Swiper modules
SwiperCore.use([Keyboard, Pagination, Navigation]);

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
      dispatch(getRoles());
    };
    fetchRoles();
  }, [dispatch]);
  return (
    <div id="carousel">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        navigation
        className="mySwiper"
      >
        {roles.map((item) => {
          return (
            <div key={item.id}>
              <SwiperSlide>
                <SingleCarouselItem {...item} />
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>
      <div className="swiper-pagination" />
    </div>
  );
};

export default ViewRolesContainer;
