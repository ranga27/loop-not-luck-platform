import React from 'react';
import { collection, query } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import CompanyCard from '../../../components/cards/CompanyCard';
import { firestore } from '../../../helpers/firebase';
import { formatDateInArray } from '../../../helpers/utils';

const ViewCompanies = () => {
  const { isLoading, data: companies } = useFirestoreQuery(
    ['companies'],
    query(collection(firestore, 'companies')),
    {
      subscribe: true,
    },
    {
      // React Query data selector
      select(snapshot) {
        const rolesData = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));
        return formatDateInArray(rolesData);
      },
    }
  );
  // TODO: add logic for no roles found
  if (isLoading) {
    return <div className="loading" />;
  }
  return (
    <Row>
      {companies.length === 0 && <p>No companies available!</p>}
      {companies.length > 0 &&
        companies.map((company) => {
          return (
            <Colxx xs="6" sm="4" xl="3" className="mb-4" key={company.id}>
              <CompanyCard company={company} />
            </Colxx>
          );
        })}
    </Row>
  );
};

export default ViewCompanies;
