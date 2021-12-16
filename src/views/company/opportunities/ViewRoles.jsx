/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import GlideComponent from '../../../components/carousel/GlideComponent';
import { items } from './carouselItems';
import { SingleCarouselItem } from './SingleCarouselItem';

const ViewRoles = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.view-roles" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="pl-0 pr-0 mb-5">
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
        </Colxx>
      </Row>
    </>
  );
};

export default ViewRoles;
