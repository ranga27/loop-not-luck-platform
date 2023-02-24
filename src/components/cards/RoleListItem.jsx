/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Row, Table, ButtonToggle } from 'reactstrap';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import useRoleStore from '../../hooks/useRoleStore';
import StoreInUsestate, {
  formatDateInArray,
  searchData,
  sortScreeningUserList,
} from '../../helpers/Utils';
import IntlMessages from '../../helpers/IntlMessages';

// TODO: investigate if roles should be queried using useQuery.
const RoleListItem = ({ roles }) => {
  const [activeId, setActiveId] = useState('1');
  const setRole = useRoleStore((state) => state.setRoleForReview);
  const [filtered, setFiltered] = useState(roles);
  const [sorting, setsorting] = useState(roles);
  const [typeSort, settypeSort] = useState('');

  const [searchInput, setSearchInput] = useState({
    title: '',
    department: '',
  });

  const clearSearch = () => {
    setSearchInput({
      title: '',
      department: '',
    });
  };

  useEffect(() => {
    setFiltered(searchData(searchInput, roles));
  }, [searchInput]);

  const sortingAscendingDescending = (sortRequest) => {
    settypeSort(sortRequest);
    setsorting(sortScreeningUserList(roles, sortRequest));
  };

  useEffect(() => {
    setFiltered(roles);
    setsorting(roles);
  }, [roles]);

  useEffect(() => {
    setFiltered(sorting);
  }, [sorting, typeSort]);

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
                <IntlMessages id="pages.roles-table-head-id" />
              </td>
              <td className="w-0.5">
                <IntlMessages id="pages.roles-table-head-roleTitle" />
              </td>
              <td className="w-0.5">
                <IntlMessages id="pages.roles-table-head-department" />
              </td>
              <td className="w-0.5">
                <IntlMessages id="pages.roles-table-head-roleType" />
              </td>
              <td className="w-0.5">
                <IntlMessages id="pages.roles-table-head-roleStatus" />
              </td>
              <td className="w-0.5 text-center">
                <IntlMessages id="pages.roles-table-head-roleCreatedAt" />
              </td>
            </tr>
            <tr>
              <td />
              <td className="h-10">
                <input
                  placeholder="Role"
                  className="small_input_search_field"
                  name="title"
                  onChange={(e) => {
                    StoreInUsestate.handleChange(e, setSearchInput);
                  }}
                  value={searchInput.title}
                />
              </td>
              <td>
                <input
                  placeholder="Department"
                  name="department"
                  onChange={(e) => {
                    StoreInUsestate.handleChange(e, setSearchInput);
                  }}
                  value={searchInput.department}
                />
              </td>
              <td className="d-flex justify-content-between fw-bold">
                <Button
                  style={{ marginRight: 4 }}
                  outline
                  size="xs"
                  color="primary"
                  onClick={() => {
                    sortingAscendingDescending('activeRoles');
                  }}
                >
                  Active
                </Button>

                <Button
                  outline
                  size="xs"
                  color="primary"
                  onClick={() => {
                    sortingAscendingDescending('archivedRoles');
                  }}
                >
                  Archived
                </Button>
              </td>
            </tr>
          </thead>
          <tbody>
            {roles?.length === 0 && <p>No companies available!</p>}
            {filtered?.length > 0 &&
              filtered.map((role, index) => (
                <tr key={role.id}>
                  <td className="flex justify-center">{index}</td>
                  <td>
                    <img
                      src={role.logoUrl}
                      height="50"
                      width="50"
                      alt="logo"
                      className="me-2"
                    />
                    {role?.title}
                  </td>
                  <td>{role?.department}</td>
                  <td>
                    {role?.type === 'company-role'
                      ? 'Company Role'
                      : 'Admin Role'}
                  </td>
                  <td>{role?.department}</td>
                  <td className="text-center">{role?.createdAt}</td>
                  <td className="w-0.5 z-1000">
                    {role?.type === 'company-role' ? (
                      'Not Editable'
                    ) : (
                      <Button
                        outline
                        size="xs"
                        color="primary"
                        tag={Link}
                        to="edit"
                        disabled={role?.type === 'company-role'}
                        onClick={() => setRole(role)}
                      >
                        Edit
                      </Button>
                    )}
                  </td>
                  <td className="w-0.5">
                    <Button
                      outline
                      size="xs"
                      color="primary"
                      tag={Link}
                      to="view"
                      onClick={() => setRole(role)}
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

export default RoleListItem;
