import React from 'react';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { doc, serverTimestamp } from 'firebase/firestore';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import Swal from 'sweetalert2';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import useTemplateStore from '../../../hooks/useTemplateStore';
import { firestore } from '../../../helpers/Firebase';
import EditTemplateForm from '../../../components/form/EditTemplateForm';

const EditTemplate = () => {
  const template = useTemplateStore((state) => state.template);
  console.log(template);
  const mutation = useFirestoreDocumentMutation(
    doc(firestore, 'templates', template.id),
    { merge: true }
  );

  const onSubmit = async (data) => {
    const { id, ...newData } = {
      ...data,
      updatedAt: serverTimestamp(),
    };

    mutation.mutate(newData, {
      onSuccess() {
        Swal.fire('Updated!', 'Template Data Updated.', 'success');
      },
      onError(error) {
        Swal.fire('Oops!', 'Failed to Update Template.', error);
      },
      onMutate() {
        console.info('Updating document...');
      },
    });
  };

  if (!template) {
    return <h6>Template data not found, please select another</h6>;
  }
  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <CardTitle>
              <IntlMessages id="forms.edit-template" />
            </CardTitle>
            <EditTemplateForm
              template={template}
              onSubmit={(data) => onSubmit(data)}
            />
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default EditTemplate;
