import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { adminRoot } from '../../constants/defaultValues';
import { editCompany } from '../../redux/actions';
import ThumbnailImage from './ThumbnailImage';

const CompanyCard = ({ company }) => {
  const dispatch = useDispatch();
  return (
    <Card key={company.id} className="d-flex flex-row mb-4">
      <ThumbnailImage className="m-4" src={company.logoUrl} />
      <div className=" d-flex flex-grow-1 min-width-zero">
        <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
          <div className="min-width-zero">
            <CardTitle className="truncate mb-1">{company.name}</CardTitle>
            <Button
              outline
              size="xs"
              color="primary"
              tag={Link}
              to={`${adminRoot}/admin/editcompany`}
              onClick={() => dispatch(editCompany(company))}
            >
              Edit
            </Button>
          </div>
        </CardBody>
      </div>
    </Card>
  );
};

export default CompanyCard;
