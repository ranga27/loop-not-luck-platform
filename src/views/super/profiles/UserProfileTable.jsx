import React, { useState, useEffect } from 'react';
import { Table, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import IntlMessages from '../../../helpers/IntlMessages';

const UserProfileTable = ({ profiles }) => {
  const [SearchTerms, setSearchTerms] = useState('');
  const [Profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (SearchTerms !== '') {
      setProfiles(
        profiles.filter((x) => {
          return (
            x.firstName.includes(SearchTerms) || x.email.includes(SearchTerms)
          );
        })
      );
    } else {
      setProfiles(profiles);
    }
  }, [profiles, SearchTerms]);
  const onChangeSearch = (event) => {
    setSearchTerms(event.currentTarget.value);
  };
  return (
    <>
      <div>
        <div className=" bg-transparent  p-4">
          <Input
            value={SearchTerms}
            onChange={onChangeSearch}
            placeholder="Search here..."
            className="px-5 py-3 relative rounded w-full"
          />
        </div>
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
              <IntlMessages id="pages.profiles-table-head-role" />
            </th>
            <th>
              <IntlMessages id="pages.profiles-table-head-status" />
            </th>
            <th>
              <IntlMessages id="pages.profiles-table-head-createdAt" />
            </th>
          </tr>
        </thead>
        <tbody>
          {Profiles.map((profile, index) => (
            <tr key={profile.id}>
              <td>{index + 1}</td>
              <td>
                <Link color="link" to={`/app/profiles/${profile.id}`}>
                  {profile.firstName} {profile.lastName}
                </Link>
              </td>
              <td>{profile.email}</td>
              <td>{profile.role}</td>
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
