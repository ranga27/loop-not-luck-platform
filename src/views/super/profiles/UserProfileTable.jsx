import React, { useState, useEffect } from 'react';
import { Table, Input, Badge, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import IntlMessages from '../../../helpers/IntlMessages';
import {
  downloadSelectedCVs,
  sortScreeningUserList,
} from '../../../helpers/Utils';

const UserProfileTable = ({ profiles }) => {
  const [searchTerms, setSearchTerms] = useState('');
  const [filtered, setFiltered] = useState([]);

  const [sorting, setSorting] = useState([]);
  const [typeSort, setTypeSort] = useState('');

  const [cvUrls, setCvUrls] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState([]);

  function addUrlInList(url) {
    if (url && !cvUrls?.includes(url)) {
      setCvUrls([...cvUrls, url]);
    } else {
      const index = cvUrls.indexOf(url);
      if (index > -1) {
        cvUrls.splice(index, 1);
      }
    }
  }

  function addUserDataInList(data) {
    setSelectedUserData([...selectedUserData, data]);
  }

  // Filter profiles based on search terms
  useEffect(() => {
    const filteredProfiles = profiles.filter((x) => {
      const firstName = x.firstName.toLowerCase();
      const email = x.email.toLowerCase();
      // const hearAbout = x.hearAbout?.toLowerCase() || '';
      const search = searchTerms ? searchTerms.toLowerCase() : '';

      return (
        firstName.includes(search) || email.includes(search)
        // ||
        // hearAbout.includes(search) ||
      );
    });

    const sortedProfiles = sortScreeningUserList(filteredProfiles, typeSort);

    setFiltered(sortedProfiles);
    setSorting(sortedProfiles);
  }, [profiles, searchTerms, typeSort]);

  const onChangeSearch = (event) => {
    setSearchTerms(event.currentTarget.value);
  };

  const onSearchSubmit = (event) => {
    event.preventDefault();
    // Do nothing when enter key is pressed
  };

  const sortingAscendingDescending = (sortRequest) => {
    setTypeSort(sortRequest);
    setSorting(sortScreeningUserList(filtered, sortRequest));
  };

  useEffect(() => {
    setFiltered(sorting);
  }, [sorting, typeSort, searchTerms]);

  return (
    <>
      <div>
        <div className=" bg-transparent  sticky-top p-4">
          <form onSubmit={onSearchSubmit}>
            <Input
              value={searchTerms}
              onChange={onChangeSearch}
              placeholder="Search here..."
              className="px-5 py-3 relative rounded w-full"
            />
          </form>
        </div>
      </div>
      <div className="flex">
        <Badge color="success" pill className="mb-1 p-2 flex-1 z-50">
          <p className="fs-10 m-0">Total Users: {filtered?.length || 'NA'}</p>
        </Badge>
        <Button
          className="flex-1 mx-4"
          onClick={() => {
            if (cvUrls?.length) {
              downloadSelectedCVs(cvUrls);
              setCvUrls([]);
            }
          }}
        >
          Download CVs
        </Button>
      </div>
      <Table responsive hover className="sticky-top">
        <thead>
          <tr>
            <th>
              <IntlMessages id="pages.profiles-table-head-index" />
            </th>
            <th>
              <IntlMessages id="pages.profiles-table-head-name" />
            </th>
            <th>
              <IntlMessages id="pages.profiles-table-head-email" />
            </th>
            <th>
              <div className="text-center">
                <p
                  aria-hidden="true"
                  className="mb-2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    sortingAscendingDescending('sortByCompleteProfile');
                  }}
                >
                  Completed
                </p>

                <p
                  aria-hidden="true"
                  className="m-0"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    sortingAscendingDescending('sortByIncompleteProfile');
                  }}
                >
                  Incomplete
                </p>
              </div>
              <br />
              <IntlMessages id="pages.profiles-table-head-status" />
            </th>
            <th>
              <div className="text-center">
                <i
                  className="simple-icon-arrow-up sortIconSize"
                  aria-hidden="true"
                  onClick={() => {
                    sortingAscendingDescending('sortByCreatedAtAscending');
                  }}
                />
                <br />
                <i
                  className="simple-icon-arrow-down sortIconSize"
                  aria-hidden="true"
                  onClick={() => {
                    sortingAscendingDescending('sortByCreatedAtDescending');
                  }}
                />
              </div>
              <br />
              <IntlMessages id="pages.profiles-table-head-createdAt" />
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered?.length &&
            filtered.map((profile, index) => (
              <tr key={profile.id}>
                <td>
                  {index + 1}
                  <input
                    type="checkbox"
                    className="m-2 checkbox"
                    id={profile.cvUrl}
                    onClick={() => {
                      addUrlInList(profile.cvUrl);
                      addUserDataInList({
                        firstName: profile.firstName,
                        email: profile.email,
                      });
                    }}
                  />
                </td>
                <td>
                  <Link color="link" to={`/app/profiles/${profile.id}`}>
                    {profile.firstName} {profile.lastName}
                  </Link>
                </td>
                <td>{profile.email}</td>
                <td>
                  {profile.hasCompletedProfile === true
                    ? 'Completed'
                    : 'Not Completed'}
                </td>
                <td>{profile.createdAt}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserProfileTable;
