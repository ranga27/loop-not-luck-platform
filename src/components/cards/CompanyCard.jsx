import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardTitle, Button } from 'reactstrap';
import { adminRoot } from '../../constants/defaultValues';
import { editCompany } from '../../redux/actions';

const CompanyCard = ({ company }) => {
  const dispatch = useDispatch();
  return (
    <Card key={company.id} className="mb-4">
      <CardBody>
        <div className="text-center">
          <CardImg
            top
            src={company.logoUrl}
            alt="Company Logo"
            className="mb-4"
          />
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
    </Card>
  );
};

export default CompanyCard;
