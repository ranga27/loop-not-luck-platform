import React from 'react';
import { collection, query } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { Button, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { firestore } from '../../../helpers/Firebase';
import { formatDateInArray } from '../../../helpers/Utils';
import IntlMessages from '../../../helpers/IntlMessages';
import useCompanyStore from '../../../hooks/useCompanyStore';

const ViewCompanies = () => {
  const setCompany = useCompanyStore((state) => state.setCompanyForEdit);

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
      <div>
        <Table
          hover
          className="sticky-top custom_table"
          style={{
            borderCollapse: 'separate',
            borderSpacing: '0 20px',
            overflowX: 'scroll !important',
          }}
        >
          <thead>
            <tr style={{ fontWeight: 'bold' }}>
              <td className="w-0.5">
                <IntlMessages id="pages.company-table-head-id" />
              </td>
              <td className="w-0.5">
                <IntlMessages id="pages.company-table-head-companyName" />
              </td>
              <td className="w-0.5">
                <IntlMessages id="pages.company-table-head-companyEmail" />
              </td>
              <td className="w-0.5">
                <IntlMessages id="pages.company-table-head-companySigninAt" />
              </td>
            </tr>
          </thead>
          <tbody>
            {companies.length === 0 && <p>No companies available!</p>}
            {companies.length > 0 &&
              companies.map((company, index) => (
                <tr key={company.id}>
                  <td className="flex justify-center">{index}</td>
                  <td>
                    <img
                      src={company.logoUrl}
                      height="50"
                      width="50"
                      alt="logo"
                      className="me-2"
                    />
                    {company?.name}
                  </td>
                  <td>{company?.email}</td>
                  <td>
                    {company?.updatedAt ? company.updatedAt : company.createdAt}
                  </td>
                  <td className="w-0.5">
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
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </Row>
  );
};

export default ViewCompanies;
