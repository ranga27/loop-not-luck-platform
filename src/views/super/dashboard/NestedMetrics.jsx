/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Row } from 'reactstrap';
import { fetchMetrics } from '../../../helpers/firestoreService';
import { Colxx } from '../../../components/common/CustomBootstrap';

const NestedMetrics = ({ users }) => {
  const [metrics, setMetrics] = useState({});
  useEffect(() => {
    fetchMetrics(users).then((results) => {
      setMetrics(results);
    });
  }, [users]);

  return (
    <Row md="2">
      <Colxx lg="6" className="mb-4">
        <Card className="mb-4">
          <CardBody>
            <div className="text-center">
              <CardTitle className="mb-1">
                Total number of roles saved
              </CardTitle>
              <h3 style={{ fontWeight: 'bold' }}>{metrics.saved}</h3>
            </div>
          </CardBody>
        </Card>
      </Colxx>

      <Colxx lg="6" className="mb-4">
        <Card className="mb-4">
          <CardBody>
            <div className="text-center">
              <CardTitle className="mb-1">
                Total number of roles applied to
              </CardTitle>
              <h3 style={{ fontWeight: 'bold' }}>{metrics.applied}</h3>
            </div>
          </CardBody>
        </Card>
      </Colxx>

      <Colxx lg="6" className="mb-4">
        <Card className="mb-4">
          <CardBody>
            <div className="text-center">
              <CardTitle className="mb-1">
                Total number of roles declined with reason Salary or Not
                Interesting
              </CardTitle>
              <h3 style={{ fontWeight: 'bold' }}>{metrics.declinedRoles}</h3>
            </div>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default NestedMetrics;
