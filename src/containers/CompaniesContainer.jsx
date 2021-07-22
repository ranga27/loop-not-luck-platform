import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import { Colxx } from '../components/common/CustomBootstrap';
import { getCompanies } from '../redux/actions';
import CompanyCard from '../components/cards/CompanyCard';

const CompaniesContainer = () => {
  const { companies, loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);
  return (
    <>
      <Row>
        {loading && <p>Loading...</p>}
        {companies.length === 0 && !loading && <p>No companies available!</p>}
        {error && !loading && <p>{error}</p>}
        {companies.length > 0 &&
          companies.map((company) => {
            return (
              <Colxx xs="6" sm="4" xl="3" className="mb-4" key={company.id}>
                <CompanyCard company={company} />
              </Colxx>
            );
          })}
      </Row>
    </>
  );
};

export default CompaniesContainer;
