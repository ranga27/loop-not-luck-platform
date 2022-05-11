import React from 'react';
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { collection, serverTimestamp } from 'firebase/firestore';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import Swal from 'sweetalert2';
import { Colxx } from '../../../components/common/CustomBootstrap';
import AddTemplateForm from '../../../components/form/AddTemplateForm';
import IntlMessages from '../../../helpers/IntlMessages';
import { firestore } from '../../../helpers/Firebase';

const AddTemplate = () => {
  const mutation = useFirestoreCollectionMutation(
    collection(firestore, 'templates')
  );
  const onSubmit = async (data) => {
    const newData = { ...data, createdAt: serverTimestamp() };

    console.log(newData);
    mutation.mutate(newData, {
      onSuccess() {
        Swal.fire('Added!', 'New Template Added.', 'success');
      },
      onError(error) {
        Swal.fire('Oops!', 'Failed to Add Template.', error);
      },
      onMutate() {
        console.info('Adding document...');
      },
    });
  };
  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <CardTitle>
              <IntlMessages id="forms.add-template" />
            </CardTitle>
            <AddTemplateForm onSubmit={(data) => onSubmit(data)} />
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default AddTemplate;
