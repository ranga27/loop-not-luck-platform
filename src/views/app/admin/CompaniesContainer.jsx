import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, CardBody, CardTitle, Button } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { getCompanies } from '../../../redux/actions';
import ThumbnailImage from '../../../components/cards/ThumbnailImage';

const CompaniesContainer = () => {
  const { companies, loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);
  return (
    <>
      <Row>
        <Colxx md="6" sm="6" lg="4" xxs="12">
          {loading && <p>Loading...</p>}
          {companies.length === 0 && !loading && <p>No companies available!</p>}
          {error && !loading && <p>{error}</p>}
          {companies.length > 0 &&
            companies.map((item) => {
              return (
                <Card key={item.id} className="d-flex flex-row mb-4">
                  <ThumbnailImage className="m-4" src={item.logoUrl} />
                  <div className=" d-flex flex-grow-1 min-width-zero">
                    <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                      <div className="min-width-zero">
                        <CardTitle className="truncate mb-1">
                          {item.name}
                        </CardTitle>
                        <Button outline size="xs" color="primary">
                          Edit
                        </Button>
                      </div>
                    </CardBody>
                  </div>
                </Card>
              );
            })}
        </Colxx>
      </Row>
    </>
  );
};

export default CompaniesContainer;
