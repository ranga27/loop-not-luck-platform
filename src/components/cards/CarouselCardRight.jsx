/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Card, CardBody, Badge, Button, Form } from 'reactstrap';
import { doc, serverTimestamp } from 'firebase/firestore';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { useQuery, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { firestore } from '../../helpers/Firebase';
import { TextInput } from '../form/FormFields';

const CarouselCardRight = ({ role }) => {
  const defaultValues = {
    moreDetails: '',
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const [declineResponse, setDeclineResponse] = useState('');
  const client = useQueryClient();
  const user = useQuery(['userAuth']);
  const { uid } = user.data;
  const mutation = useFirestoreDocumentMutation(
    doc(firestore, `users/${uid}/matchedRoles`, role.id),
    { merge: true },
    {
      onSettled: () => {
        client.invalidateQueries('matchedRoles');
        client.invalidateQueries('savedRoles');
      },
    }
  );

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      declineResponse,
      updatedAt: serverTimestamp(),
    };
    console.log('SUBMIT: ', newData);
    mutation.mutate(newData);
    reset(defaultValues);
  };

  return (
    <Card style={{ marginLeft: '0px' }}>
      <CardBody className="m-3 p-3">
        <h1 className="mt-3">
          You are a{' '}
          <span className="text-primary" style={{ fontWeight: 'bold' }}>
            {role.score}%{' '}
          </span>
          match
        </h1>
        <div>
          {role.rolesOfInterests && role.rolesOfInterests.length > 0
            ? role.rolesOfInterests.map((item, index) => (
                <Badge
                  color={
                    index === 0 ? 'primary' : index === 1 ? 'success' : 'danger'
                  }
                  key={item}
                  pill
                  className="mb-1 px-4 py-2 mx-2 my-2"
                  style={{ fontSize: '20px' }}
                >
                  {item}
                </Badge>
              ))
            : null}
          {role.behaviourAttributesStrengths &&
          role.behaviourAttributesStrengths.length > 0
            ? role.behaviourAttributesStrengths.map((item, index) => (
                <Badge
                  color={
                    index === 0 ? 'primary' : index === 1 ? 'success' : 'danger'
                  }
                  key={item}
                  pill
                  className="mb-1 px-4 py-2 mx-2 my-2"
                  style={{ fontSize: '20px' }}
                >
                  {item}
                </Badge>
              ))
            : null}
        </div>

        <div>
          <h3 className="mt-3" style={{ fontWeight: 'bold' }}>
            Not a good fit? Tell us why
          </h3>
          <p className="text-muted">
            The more we know about you and what you are looking for from a role.
            The better our recommendations will be!
          </p>

          {role.moreDetails || role.declineResponse ? (
            <h3
              className="text-center"
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: '40px',
                marginBottom: '40px',
              }}
            >
              Thank you for your feedback
            </h3>
          ) : (
            <>
              <div
                className="mx-auto text-center"
                style={{ textAlign: 'center' }}
              >
                <div className="px-2 py-2">
                  <Button
                    id="applyButton"
                    color="primary"
                    className="text-xl"
                    disabled={declineResponse !== ''}
                    onClick={() => setDeclineResponse('Not Interesting')}
                  >
                    Not Interesting
                  </Button>
                </div>

                <div className="px-2 py-2">
                  <Button
                    id="applyButton"
                    color="primary"
                    onClick={() => setDeclineResponse('Renumeration')}
                    className=""
                    disabled={declineResponse !== ''}
                  >
                    Renumeration
                  </Button>
                </div>
              </div>
              <div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <TextInput
                    name="moreDetails"
                    placeholder="Tell us why its not a good fit....."
                    errors={errors.moreDetails}
                    type="textarea"
                    control={control}
                    rows="4"
                  />
                  <div
                    className="mx-auto text-center"
                    style={{ textAlign: 'center' }}
                  >
                    <Button
                      id="saveButton"
                      color="primary"
                      type="submit"
                      outline
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default CarouselCardRight;
