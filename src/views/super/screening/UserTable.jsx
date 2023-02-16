import React, { useState, useEffect } from 'react';
import { Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import IntlMessages from '../../../helpers/IntlMessages';
import StoreInUsestate, {
  searchData,
  sortScreeningUserList,
} from '../../../helpers/Utils';
import '../../../assets/css/sass/user.scss';

const UserTable = ({ userRoles }) => {
  const [sorting, setsorting] = useState(userRoles);
  const [typeSort, settypeSort] = useState('');

  const [searchInput, setSearchInput] = useState({
    match: '',
    department: '',
    positionType: '',
    roleTitle: '',
    company: '',
    applicantEmail: '',
    userFullName: '',
    recordId: '',
    appliedAt: '',
  });
  const clearSearch = () => {
    setSearchInput({
      match: '',
      department: '',
      positionType: '',
      roleTitle: '',
      company: '',
      applicantEmail: '',
      userFullName: '',
      recordId: '',
      appliedAt: '',
    });
  };

  const [filtered, setFiltered] = useState(userRoles);
  useEffect(() => {
    setFiltered(userRoles);
  }, [userRoles]);

  useEffect(() => {
    setFiltered(searchData(searchInput, userRoles));
  }, [searchInput]);

  const sortingAscendingDescending = (sortRequest) => {
    settypeSort(sortRequest);
    setsorting(sortScreeningUserList(filtered, sortRequest));
  };

  useEffect(() => {
    setFiltered(sorting);
  }, [sorting, typeSort]);

  return (
    <>
      <Button onClick={clearSearch}>Clear Search</Button>
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
          <tr>
            <th className="w-0.5">
              <IntlMessages id="pages.applicant-id" />
            </th>
            <th className="w-0.5">
              <IntlMessages id="pages.application-name" />
            </th>
            <th className="w-0.5">
              <IntlMessages id="pages.application-email" />
            </th>
            <th className="w-0.5">
              <IntlMessages id="pages.application-applied-id" />
            </th>
            <th className="w-0.5">
              <IntlMessages id="pages.application-company" />
            </th>
            <th className="w-0.5">
              <IntlMessages id="pages.application-title" />
            </th>
            <th className="w-0.5">
              <IntlMessages id="pages.application-position" />
            </th>
            <th className="w-0.5">
              <IntlMessages id="pages.application-department" />
            </th>
            <th className="w-0.5">
              <IntlMessages id="pages.application-match" />
            </th>
          </tr>
          <tr>
            <td className="w-0.5">
              <input
                placeholder="Id"
                className="small_input_search_field"
                name="recordId"
                onChange={(e) => {
                  StoreInUsestate.handleChange(e, setSearchInput);
                }}
                value={searchInput.recordId}
              />
            </td>
            <td>
              <input
                placeholder="Name"
                name="userFullName"
                onChange={(e) => {
                  StoreInUsestate.handleChange(e, setSearchInput);
                }}
                value={searchInput.userFullName}
              />
            </td>
            <td>
              <input
                placeholder="Email"
                name="applicantEmail"
                onChange={(e) => {
                  StoreInUsestate.handleChange(e, setSearchInput);
                }}
                value={searchInput.applicantEmail}
              />
            </td>
            <td>
              <input
                placeholder="Applied date"
                className="medium_input_search_field"
                type="date"
                name="appliedAt"
                onChange={(e) => {
                  StoreInUsestate.handleChange(e, setSearchInput);
                }}
              />
            </td>
            <td>
              <input
                placeholder="Company"
                className="medium_input_search_field"
                name="company"
                onChange={(e) => {
                  StoreInUsestate.handleChange(e, setSearchInput);
                }}
                value={searchInput.company}
              />
            </td>
            <td>
              <input
                placeholder="Role"
                className="medium_input_search_field"
                name="roleTitle"
                onChange={(e) => {
                  StoreInUsestate.handleChange(e, setSearchInput);
                }}
                value={searchInput.roleTitle}
              />
            </td>
            <td>
              <input
                placeholder="Position"
                className="medium_input_search_field"
                name="positionType"
                onChange={(e) => {
                  StoreInUsestate.handleChange(e, setSearchInput);
                }}
                value={searchInput.positionType}
              />
            </td>
            <td>
              <input
                placeholder="Department"
                className="medium_input_search_field"
                name="department"
                onChange={(e) => {
                  StoreInUsestate.handleChange(e, setSearchInput);
                }}
                value={searchInput.department}
              />
            </td>
            <td>
              <input
                placeholder="Match %"
                className="small_input_search_field"
                name="match"
                onChange={(e) => {
                  StoreInUsestate.handleChange(e, setSearchInput);
                }}
                value={searchInput.match}
              />
            </td>
          </tr>
          <tr className="sortingRow">
            <td />
            <td>
              <div className="text-center">
                <i
                  className="simple-icon-arrow-up sortIconSize"
                  aria-hidden="true"
                  onClick={() => {
                    sortingAscendingDescending('usernameAscending');
                  }}
                />
                <br />
                <i
                  className="simple-icon-arrow-down sortIconSize"
                  aria-hidden="true"
                  onClick={() => {
                    sortingAscendingDescending('usernameDescending');
                  }}
                />
              </div>
            </td>
            <td>
              <div className="text-center">
                <i
                  className="simple-icon-arrow-up sortIconSize"
                  aria-hidden="true"
                  onClick={() => {
                    sortingAscendingDescending('emailAscending');
                  }}
                />
                <br />
                <i
                  className="simple-icon-arrow-down sortIconSize"
                  aria-hidden="true"
                  onClick={() => {
                    sortingAscendingDescending('emailDescending');
                  }}
                />
              </div>
            </td>
            <td>
              <div className="text-center">
                <i
                  className="simple-icon-arrow-up sortIconSize"
                  aria-hidden="true"
                  onClick={() => {
                    sortingAscendingDescending('appliedAtAscending');
                  }}
                />
                <br />
                <i
                  className="simple-icon-arrow-down sortIconSize"
                  aria-hidden="true"
                  onClick={() => {
                    sortingAscendingDescending('appliedAtDescending');
                  }}
                />
              </div>
            </td>
            <td>
              <div className="text-center">
                <i
                  className="simple-icon-arrow-up sortIconSize"
                  aria-hidden="true"
                  onClick={() => {
                    sortingAscendingDescending('companyAscending');
                  }}
                />
                <br />
                <i
                  className="simple-icon-arrow-down sortIconSize"
                  aria-hidden="true"
                  onClick={() => {
                    sortingAscendingDescending('companyDescending');
                  }}
                />
              </div>
            </td>
            <td />

            <td />

            <td>
              <div className="text-center">
                <i
                  className="simple-icon-arrow-up sortIconSize"
                  aria-hidden="true"
                  onClick={() => {
                    sortingAscendingDescending('departmentAscending');
                  }}
                />
                <br />
                <i
                  className="simple-icon-arrow-down sortIconSize"
                  aria-hidden="true"
                  onClick={() => {
                    sortingAscendingDescending('departmentDescending');
                  }}
                />
              </div>
            </td>
            <td>
              <div className="text-center">
                <i
                  className="simple-icon-arrow-up sortIconSize"
                  aria-hidden="true"
                  onClick={() => {
                    sortingAscendingDescending('scoreAscending');
                  }}
                />
                <br />
                <i
                  className="simple-icon-arrow-down sortIconSize"
                  aria-hidden="true"
                  onClick={() => {
                    sortingAscendingDescending('scoreDescending');
                  }}
                />
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          {filtered.map((user) => (
            <tr key={user.recordId}>
              <td className="cusrom_row">{user.recordId}</td>
              <td>
                <Link
                  color="link"
                  to={`/app/screening/${user.userId}/${user.roleId}`}
                >
                  {user.userFullName}
                </Link>
              </td>
              <td className="w-0.5 ">{user.applicantEmail}</td>
              <td>{user.appliedAt.toString()}</td>
              <td>{user.company}</td>
              <td>{user.roleTitle}</td>
              <td>{user.positionType}</td>
              <td>{user.department}</td>
              <td>{user.match}%</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default UserTable;
