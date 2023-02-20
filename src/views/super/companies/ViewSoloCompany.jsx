import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Badge, Button } from 'reactstrap';
import { firestore } from '../../../helpers';
import useCompanyStore from '../../../hooks/useCompanyStore';

const ViewSoloCompany = () => {
  const company = useCompanyStore((state) => state.company);
  const [companyStatus, setCompanyStatus] = useState('');

  useEffect(() => {
    if (!Object.keys(company).includes('status')) {
      setCompanyStatus(true);
    } else {
      setCompanyStatus(company.status);
    }
  }, [company]);

  const changeStatus = async () => {
    if (!Object.keys(company).includes('status')) {
      setDoc(
        doc(firestore, `companies/${company.id}`),
        { status: false },
        { merge: true }
      );
    } else {
      setDoc(
        doc(firestore, `companies/${company.id}`),
        {
          status: !company.status,
        },
        {
          merge: true,
        }
      );
    }
  };

  return (
    <div>
      <h2 className="text-center">Company Details</h2>
      <div className="w-60 d-flex justify-content-around mt-5 m-auto">
        <div>
          <img
            src={company?.logoUrl}
            height="200"
            width="200"
            alt="company-logo"
          />
          <p className="text-center mt-3 fw-bold text-success">
            {companyStatus ? 'Active' : 'Inactive'}
          </p>
        </div>
        <div className="w-50">
          <h4 className="text-left fw-bold">{company?.name}</h4>
          <h4 className="text-left ">{company?.email}</h4>
          <p className="mt-4">Industry</p>
          <div className="w-75 d-flex justify-content-between">
            {company?.industry?.map((ind) => (
              <Badge key={ind} className="p-2">
                {ind}
              </Badge>
            ))}
          </div>
          <p className="mt-4">Job Values</p>
          <div>
            {company?.jobValues?.map((val) => (
              <Badge key={val} bg="warning" className="mt-1 p-2">
                {val}
              </Badge>
            ))}
          </div>
          <p className="mt-4 mb-1">SignIn At - Updated At</p>
          <div>
            <p className="fw-bold">
              {company?.createdAt ? company.createdAt : 'NA'} -{' '}
              {company?.updatedAt ? company.updatedAt : 'NA'}
            </p>
          </div>
          <Button
            className="bg-warning border border-warning mt-2"
            onClick={() => {
              changeStatus();
              setCompanyStatus(!companyStatus);
            }}
          >
            {companyStatus ? 'Make Inactive' : 'Make Active'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewSoloCompany;
