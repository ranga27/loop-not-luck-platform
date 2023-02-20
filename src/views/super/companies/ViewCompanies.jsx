import React, { useEffect, useState } from 'react';
import { collection, query } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { Button, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { firestore } from '../../../helpers/Firebase';
import StoreInUsestate, {
  formatDateInArray,
  searchData,
  sortScreeningUserList,
} from '../../../helpers/Utils';
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

  const [filtered, setFiltered] = useState(companies);
  const [sorting, setsorting] = useState(companies);
  const [typeSort, settypeSort] = useState('');

  const [searchInput, setSearchInput] = useState({
    name: '',
    email: '',
  });

  const clearSearch = () => {
    setSearchInput({
      name: '',
      email: '',
    });
  };

  useEffect(() => {
    setFiltered(searchData(searchInput, companies));
  }, [searchInput]);

  const sortingAscendingDescending = (sortRequest) => {
    settypeSort(sortRequest);
    setsorting(sortScreeningUserList(companies, sortRequest));
  };

  useEffect(() => {
    setFiltered(companies);
    setsorting(companies);
  }, [companies]);

  useEffect(() => {
    setFiltered(sorting);
  }, [sorting, typeSort]);

  // TODO: add logic for no roles found
  if (isLoading) {
    return <div className="loading" />;
  }
  return (
    <Row>
      <Button onClick={clearSearch} className="w-15">
        Clear Search
      </Button>
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
                <IntlMessages id="pages.company-table-head-companyStatus" />
              </td>
              <td className="w-0.5 text-center">
                <IntlMessages id="pages.company-table-head-companySigninAt" />
              </td>
            </tr>
            <tr>
              <td />
              <td className="h-10">
                <input
                  placeholder="Company"
                  className="small_input_search_field"
                  name="name"
                  onChange={(e) => {
                    StoreInUsestate.handleChange(e, setSearchInput);
                  }}
                  value={searchInput.name}
                />
              </td>
              <td>
                <input
                  placeholder="Email"
                  name="email"
                  onChange={(e) => {
                    StoreInUsestate.handleChange(e, setSearchInput);
                  }}
                  value={searchInput.email}
                />
              </td>
              <td className="d-flex justify-content-between fw-bold">
                <span
                  aria-hidden="true"
                  onClick={() => {
                    sortingAscendingDescending('sortActiveCompanies');
                  }}
                >
                  Active
                </span>
                <span
                  aria-hidden="true"
                  onClick={() => {
                    sortingAscendingDescending('sortInactiveCompanies');
                  }}
                >
                  Inactive
                </span>
              </td>
            </tr>
          </thead>
          <tbody>
            {companies?.length === 0 && <p>No companies available!</p>}
            {filtered?.length > 0 &&
              filtered.map((company, index) => (
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
                    {company?.status === undefined || company.status === true
                      ? 'Active'
                      : 'Inactive'}
                  </td>
                  <td className="text-center">
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
                  <td className="w-0.5">
                    <Button
                      outline
                      size="xs"
                      color="primary"
                      tag={Link}
                      to="viewsolo"
                      onClick={() => setCompany(company)}
                    >
                      View
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
