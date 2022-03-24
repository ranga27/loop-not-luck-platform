/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardTitle, Button } from 'reactstrap';
import useCompanyStore from '../../hooks/useCompanyStore';

const CompanyCard = ({ company }) => {
  const setCompany = useCompanyStore((state) => state.setCompanyForEdit);
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
            to="edit"
            onClick={() => setCompany(company)}
          >
            Edit
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default CompanyCard;
