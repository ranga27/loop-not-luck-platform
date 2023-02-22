/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
} from '@react-query-firebase/firestore';
import { format } from 'date-fns';
import { collection, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useQuery, useQueryClient } from 'react-query';
import { Button, Card, CardBody, Tooltip } from 'reactstrap';
import { firestore } from '../../helpers/Firebase';
// import QuestionPopup from '../QuestionPopup';

const CarouselCardLeft = ({
  role,
  setquestionInqueryModel,
  setCurrentRole,
  setapplyEmailData,
}) => {
  const [saved, setSaved] = useState(role.saved);
  const client = useQueryClient();
  // TODO: create readMore component
  const { isLoading } = useQuery(['matchedRoles']);
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const userDoc = useQuery('userDoc');

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const {
    uid,
    hasCompletedProfile,
    cvUrl,
    cvUploadDate,
    email,
    firstName,
    lastName,
  } = userDoc.data;

  const mutation = useFirestoreDocumentMutation(
    doc(firestore, `users/${uid}/matchedRoles`, role.id),
    { merge: true },
    {
      // After success or failure, refetch the matchedRoles query. TODO: may be refetch only the role & not the whole list
      onSettled: () => {
        client.invalidateQueries('matchedRoles');
        client.invalidateQueries('savedRoles');
      },
    }
  );
  const appliedRoleMutation = useFirestoreCollectionMutation(
    collection(firestore, 'appliedRoles')
  );
  const saveRole = async () => {
    // Optimistic update for button state
    setSaved(!saved);
    const newData = { saved: !role.saved, updatedAt: serverTimestamp() };
    mutation.mutate(newData);

    Swal.fire(
      `Successfully ${saved ? 'unsaved' : 'saved'}!`,
      'You can navigate to "Saved Roles" tab to view your saved roles.',
      'success'
    );
  };

  const [emailData, setEmailData] = useState({});

  const GetCompanyEmail = async (companyID) => {
    const companySnapShot = doc(firestore, `companyV2/${companyID}`);
    const companyData = await getDoc(companySnapShot);
    const companyUserSnapshot = doc(
      firestore,
      `companyUsers/${companyData.data().userId}`
    );
    const companyUserData = await getDoc(companyUserSnapshot);
    setEmailData({
      companyEmail: companyUserData.data().email,
      userEmail: email,
      userName: `${firstName} ${lastName}`,
      roleTitle: role.title,
      match: role.score,
      applyAt: format(new Date(), 'dd-MMM-YYY'),
    });

    const emailFetchedData = {
      companyEmail: companyUserData.data().email,
      userEmail: email,
      userName: `${firstName} ${lastName}`,
      roleTitle: role.title,
      match: role.score,
      applyAt: format(new Date(), 'dd-MMM-YYY'),
    };

    return emailFetchedData;
  };

  console.log(emailData);

  const applyRole = async () => {
    GetCompanyEmail(role.companyId);
    const newData = { applied: true, updatedAt: serverTimestamp() };
    mutation.mutate(newData);
    appliedRoleMutation.mutate({
      appliedAt: serverTimestamp(),
      match: role.score,
      roleId: role.id,
      roleTitle: role.title,
      status: 'Pending Review',
      userId: uid,
      companyId: role.companyId,
      applicantEmail: email,
      positionType: role.positionType,
      department: role.department,
      company: role.company,
      userFullName: `${firstName} ${lastName}`,
    });
    Swal.fire(
      'Successfully applied!',
      'You can navigate to "Applications" tab to view your applications.',
      'success'
    );
  };

  const handleApplyButtonClick = async (selectedRole) => {
    if (selectedRole.isQuestion) {
      const emailDataForForm = await GetCompanyEmail(role.companyId);
      setquestionInqueryModel(selectedRole.isQuestion);
      setCurrentRole(selectedRole);
      setapplyEmailData(emailDataForForm);
    } else {
      applyRole();
    }
  };

  return (
    <Card
      style={{ marginLeft: '0px', height: '600px', overflowY: 'auto' }}
      data-cy="my-loop-left-carousel-card"
    >
      <CardBody>
        <div className="d-flex flex-row m-2 p-2">
          <img
            className="responsive"
            src={role.logoUrl}
            alt={role.title}
            style={{
              width: '100px',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '50% 50%',
            }}
          />
          <div>
            <h6
              className="text-primary"
              style={{ marginLeft: '20px', fontWeight: 'bold' }}
            >
              {role.company}
            </h6>
            <h5
              className="text-muted font-weight-medium"
              style={{ marginLeft: '20px', fontSize: '14px' }}
            >
              {role.title}
            </h5>
          </div>
        </div>

        <div className="m-2 p-2">
          {role.status ? (
            <>
              <h6
                className="mt-2 mb-2 text-primary"
                style={{ fontWeight: 'bold' }}
              >
                {role.status === 'Rejected' ? 'Rejected' : 'Congratulations'}
              </h6>
              <h6 className="text-muted mb-4">
                {role.status === 'Rejected'
                  ? `We really appreciate you taking the time to apply and interview with us and we wish you best of luck in your job search.`
                  : `Your profile has been accepted by ${role.company}. Expect
                feedback from them soon.`}
              </h6>
            </>
          ) : null}
          <h6 style={{ fontWeight: 'bold' }}>Application Deadline:</h6>
          <h6 className="text-muted">{role.deadline}</h6>
          <h6 className="mt-2" style={{ fontWeight: 'bold' }}>
            Location
          </h6>
          <h6 className="text-muted">{role.locationType || ''}</h6>
          <h6 className="text-muted">{role.location}</h6>
          <h6 className="mt-2" style={{ fontWeight: 'bold' }}>
            Position
          </h6>
          <h6 className="text-muted">{role.positionType}</h6>
          <h6 className="mt-2" style={{ fontWeight: 'bold' }}>
            Department
          </h6>
          <h6 className="text-muted">{role.department}</h6>
          <h6 className="mt-2" style={{ fontWeight: 'bold' }}>
            Salary
          </h6>
          <h6 className="text-muted">{role.salary}</h6>
          <h6 className="mt-2" style={{ fontWeight: 'bold' }}>
            Description
          </h6>
          {role.description && (
            <h6 className="text-muted">
              {isReadMore ? role.description.slice(0, 150) : role.description}
              <span onClick={toggleReadMore} style={{ color: '#F7B919' }}>
                {role.description.length > 150
                  ? isReadMore
                    ? ' Read more'
                    : ' Show less'
                  : ''}
              </span>
            </h6>
          )}
          <h6 className="mt-2" style={{ fontWeight: 'bold' }}>
            More Role Description
          </h6>
          {role.moreRoleInfo && (
            <h6 className="text-muted">
              {isReadMore ? role.moreRoleInfo.slice(0, 150) : role.moreRoleInfo}
              <span onClick={toggleReadMore} style={{ color: '#F7B919' }}>
                {role.moreRoleInfo.length > 150
                  ? isReadMore
                    ? ' Read more'
                    : ' Show less'
                  : ''}
              </span>
            </h6>
          )}

          <h6 className="mt-2" style={{ fontWeight: 'bold' }}>
            Experience Needed
          </h6>
          <h6 className="text-muted">{role.experience}</h6>
          {role.status ? (
            <>
              <h6 className="mt-2" style={{ fontWeight: 'bold' }}>
                Status
              </h6>
              <h6 className="text-muted">{role.status}</h6>
            </>
          ) : null}
        </div>

        <div className="d-flex flex-row">
          {role.applied === true ? (
            <Button
              id="applyButton"
              color="primary"
              className="slider-top-button"
              disabled
            >
              Applied
            </Button>
          ) : (
            <Button
              id="applyButton"
              color="primary"
              onClick={() => handleApplyButtonClick(role)}
              className="slider-top-button"
              disabled={
                hasCompletedProfile === false ||
                cvUrl === null ||
                cvUploadDate === null
              }
            >
              Apply
            </Button>
          )}

          <Button
            id="saveButton"
            color="primary"
            onClick={() => saveRole()}
            outline
            className="slider-top-button"
            disabled={isLoading}
          >
            {saved === true ? 'Unsave' : 'Save'}
          </Button>
        </div>
        {hasCompletedProfile === false ||
        cvUrl === null ||
        cvUploadDate === null ? (
          <div className="d-flex">
            <Tooltip
              placement="bottom"
              isOpen={tooltipOpen}
              target="TooltipExample"
              toggle={toggle}
              autohide={false}
            >
              Please complete your profile and upload your cv before you apply
              for any role. Visit{' '}
              <a
                href="https://loop-luck.web.app/app/account"
                rel="noreferrer"
                className="text-primary"
              >
                Here
              </a>{' '}
              to complete your profile.
            </Tooltip>
            <i
              className="iconsminds-information h4 px-2 text-primary"
              style={{ width: '40px', fontWeight: 'bold' }}
              id="TooltipExample"
            />
            <span className="py-1">Complete your profile before you apply</span>
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
};

export default CarouselCardLeft;
