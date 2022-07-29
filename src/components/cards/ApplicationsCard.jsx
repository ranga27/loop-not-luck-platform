import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { doc, serverTimestamp } from 'firebase/firestore';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { useQuery, useQueryClient } from 'react-query';
import { Card, CardBody, Badge, Button, Collapse, Form } from 'reactstrap';
import { FileUpload } from '../form/FormFields';
import { firestore } from '../../helpers/Firebase';
import { uploadFile } from '../../helpers/uploadFile';

const ApplicationsCard = ({ application }) => {
  const [collapse, setCollapse] = useState(false);
  const { control, handleSubmit } = useForm({});
  const client = useQueryClient();
  const user = useQuery(['userAuth']);
  const { uid } = user.data;
  const mutation = useFirestoreDocumentMutation(
    doc(firestore, `users/${uid}/matchedRoles`, application.id),
    { merge: true },
    {
      onSettled: () => {
        client.invalidateQueries('matchedRoles');
        client.invalidateQueries('savedRoles');
      },
    }
  );

  const onSubmit = async (data) => {
    const newData = { ...data };

    try {
      const payload = await uploadFile(
        newData.coverLetter,
        newData.coverLetter.name + Date.now(),
        'coverLetters'
      );

      const updatedData = {
        coverLetterUrl: payload,
        updatedAt: serverTimestamp(),
      };

      mutation.mutate(updatedData, {
        onSuccess() {
          Swal.fire({
            title: 'Uploaded!',
            text: 'Your cover letter has been uploaded.',
            icon: 'success',
            confirmButtonColor: '#F7B919',
            iconColor: '#3085d6',
          });
        },
        onError(error) {
          Swal.fire('Oops!', 'Failed to update cover letter.', error);
        },
        onMutate() {
          console.info('Updating document...');
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card key={application.id} className="">
      <CardBody>
        <div className="float-left">
          <div className="d-flex flex-row ">
            <img
              className="saved-role-img responsive"
              src={application.logoUrl}
              alt="application"
            />
            <div>
              <h6
                className="text-primary d-inline-block text-truncate"
                style={{
                  marginLeft: '20px',
                  fontWeight: 'bold',
                  maxWidth: '200px',
                }}
              >
                {application.company}
              </h6>
              <h5
                className="text-muted font-weight-medium d-inline-block text-truncate"
                style={{ marginLeft: '20px', maxWidth: '200px' }}
              >
                {application.title}
              </h5>
            </div>
            <div style={{ marginLeft: '40px' }}>
              <h2>
                <Badge color="primary" pill>
                  {application.score}%
                </Badge>
              </h2>
            </div>
          </div>
        </div>
        <div>
          {application.coverLetter === true ? (
            <div className="text-center">
              <p color="danger" className="text-danger pt-1">
                Cover Letter Requested
              </p>

              {application.coverLetterUrl ? (
                <p>Your Cover Letter has been uploaded successfully!</p>
              ) : (
                <Form
                  onSubmit={handleSubmit(onSubmit)}
                  className="av-tooltip tooltip-label-right"
                >
                  <FileUpload
                    label="Upload Cover Letter specific to the role (PDF file smaller than 1MB)"
                    name="coverLetter"
                    control={control}
                    required
                  />
                  <Button color="primary" type="submit" outline>
                    Submit
                  </Button>
                </Form>
              )}
            </div>
          ) : (
            <div className="text-center">
              <p className="pt-1 text-success">Application Under Review</p>
              <p>Your application to this role is under review. Stay tuned!.</p>
            </div>
          )}
        </div>
        <div className="text-center mt-3">
          {collapse ? (
            <div>
              <Button onClick={() => setCollapse(!collapse)} color="link">
                <span style={{ color: '#F7B919' }}>Close</span>
              </Button>
              <br />
              <span className="block">
                <i
                  className="simple-icon-arrow-up"
                  style={{ fontWeight: 'bold' }}
                />
              </span>
            </div>
          ) : (
            <div>
              <Button onClick={() => setCollapse(!collapse)} color="link">
                <span style={{ color: '#F7B919' }}>View Role Information</span>
              </Button>
              <br />
              <span className="block ">
                <i
                  className="simple-icon-arrow-down"
                  style={{ fontWeight: 'bold' }}
                />
              </span>
            </div>
          )}
        </div>
        <Collapse isOpen={collapse}>
          <div className="mt-3">
            <dl className="row">
              <dt className="col-sm-4">Organisation</dt>
              <dd className="col-sm-8">{application.organisation}</dd>
              <dt className="col-sm-4">Company</dt>
              <dd className="col-sm-8">{application.company}</dd>
              <dt className="col-sm-4 text-truncate">Location</dt>
              <dd className="col-sm-8">{application.location}</dd>
              <dt className="col-sm-4 text-truncate">Job Title</dt>
              <dd className="col-sm-8">{application.title}</dd>
              <dt className="col-sm-4">Department</dt>
              <dd className="col-sm-8">{application.department}</dd>
              <dt className="col-sm-4 text-truncate">Qualification</dt>
              <dd className="col-sm-8">{application.qualification}</dd>
              <dt className="col-sm-4"> Role Description</dt>
              <dd className="col-sm-8">{application.description}</dd>
              <dt className="col-sm-4 text-truncate"> Position Type</dt>
              <dd className="col-sm-8">{application.positionType}</dd>
              <dt className="col-sm-4 text-truncate">Requires cover letter</dt>
              {application.coverLetter === true ? (
                <dd className="col-sm-8">Yes</dd>
              ) : (
                <dd className="col-sm-8">No</dd>
              )}
              <dt className="col-sm-4 text-truncate">Roles Of Interests</dt>
              <dd className="col-sm-8">
                {application.rolesOfInterests
                  ? application.rolesOfInterests.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))
                  : null}
              </dd>
              <dt className="col-sm-4 text-truncate">
                Behaviour Attributes Strengths
              </dt>
              <dd className="col-sm-8">
                {application.behaviourAttributesStrengths
                  ? application.behaviourAttributesStrengths.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))
                  : null}
              </dd>
            </dl>
          </div>
        </Collapse>
      </CardBody>
    </Card>
  );
};

export default ApplicationsCard;
