/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { collection, serverTimestamp } from 'firebase/firestore';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import Swal from 'sweetalert2';
import { Colxx } from '../../../components/common/CustomBootstrap';
import AddCompanyForm from '../../../components/form/AddCompanyForm';
import IntlMessages from '../../../helpers/IntlMessages';
import { firestore } from '../../../helpers/Firebase';
import { uploadFile } from '../../../helpers/uploadFile';

const AddCompany = () => {
  const navigate = useNavigate();
  const mutation = useFirestoreCollectionMutation(
    collection(firestore, 'companies')
  );
  const onSubmit = async (data) => {
    const { logoFile, ...newData } = { ...data, createdAt: serverTimestamp() };
    // TODO: check if company exists
    if (data.logoFile) {
      const newLogoUrl = await uploadFile(
        data.logoFile,
        data.name,
        'companyLogos'
      );
      newData.logoUrl = newLogoUrl;
    }
    // TODO: move Swal to own component
    mutation.mutate(newData, {
      onSuccess() {
        Swal.fire('Added!', 'New Company Added.', 'success');
        navigate('/app/companies');
      },
      onError(error) {
        Swal.fire('Oops!', 'Failed to Add Company.', 'error');
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
              <IntlMessages id="forms.add-company" />
            </CardTitle>
            <AddCompanyForm onSubmit={(data) => onSubmit(data)} />
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default AddCompany;
