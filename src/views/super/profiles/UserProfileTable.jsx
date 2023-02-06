import React, { useState, useEffect } from 'react';
import { Table, Input, Badge, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import IntlMessages from '../../../helpers/IntlMessages';
import { sendSeperateEmailToSelecteduser } from '../../../helpers/firebaseService';
import { downloadSelectedCVs } from '../../../helpers/Utils';

const UserProfileTable = ({ profiles }) => {
  const [SearchTerms, setSearchTerms] = useState('');
  const [Profiles, setProfiles] = useState([]);

  const [cvUrls, setcvUrls] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState([]);

  function addUrlInList(url) {
    if (url && !cvUrls?.includes(url)) {
      setcvUrls([...cvUrls, url]);
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

  useEffect(() => {
    if (SearchTerms !== '') {
      setProfiles(
        profiles.filter((x) => {
          return (
            x.firstName.includes(SearchTerms) ||
            x.email.includes(SearchTerms) ||
            (x.hearAbout && x.hearAbout.includes(SearchTerms))
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
        <div className=" bg-transparent  sticky-top p-4">
          <Input
            value={SearchTerms}
            onChange={onChangeSearch}
            placeholder="Search here..."
            className="px-5 py-3 relative rounded w-full"
          />
        </div>
      </div>
      <div className="flex">
        <Badge color="success" pill className="mb-1 p-2 flex-1 z-50">
          <p className="fs-10 m-0">Total Users: {Profiles.length || 'NA'}</p>
        </Badge>
        <Button
          className="flex-1 mx-4"
          onClick={() => {
            if (cvUrls?.length) {
              downloadSelectedCVs(cvUrls);
              setcvUrls([]);
            }
          }}
        >
          Download CVs
        </Button>
        <Button
          className="flex-1"
          onClick={() => {
            sendSeperateEmailToSelecteduser(selectedUserData);
          }}
        >
          Send Template Email
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
              <IntlMessages id="pages.profiles-table-head-role" />
            </th>
            <th>
              <IntlMessages id="pages.profiles-table-head-status" />
            </th>
            <th>
              <IntlMessages id="pages.profiles-table-head-createdAt" />
            </th>
            <th>
              <IntlMessages id="pages.profiles-table-head-hearAbout" />
            </th>
          </tr>
        </thead>
        <tbody>
          {Profiles.map((profile, index) => (
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
              <td>{profile.role}</td>
              <td>
                {profile.hasCompletedProfile === true
                  ? 'Completed'
                  : 'Not Completed'}
              </td>
              <td>{profile.createdAt}</td>
              <td>
                {profile.hearAbout ? (
                  profile.hearAbout.map((item) => (
                    <Badge className="mx-1" key={item}>
                      {item}
                    </Badge>
                  ))
                ) : (
                  <p>Not selected</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserProfileTable;
