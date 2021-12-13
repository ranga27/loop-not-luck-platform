/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import GlideComponent from '../../../components/carousel/GlideComponent';
import { items } from './carouselItems';

const SingleCarouselItem = ({ title, img, category, detail, badges }) => {
  return (
    <div className="glide-item">
      <Card className="flex-row">
        <img
          className="list-thumbnail responsive border-0 card-img-left"
          src={img}
          alt={title}
        />
        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
            <p className="list-item-heading mb-1 truncate">{title}</p>

            <p className="mb-0 text-muted text-small">{category}</p>
            <p className="mb-0 text-muted text-small">{detail}</p>
            <div>
              {badges &&
                badges.map((b, index) => {
                  return (
                    <span
                      key={index}
                      className={`badge badge-pill badge-${b.color} ${
                        index < badges.length && 'mr-1'
                      }`}
                    >
                      {b.title}
                    </span>
                  );
                })}
            </div>
          </CardBody>
        </div>
      </Card>
    </div>
  );
};

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
