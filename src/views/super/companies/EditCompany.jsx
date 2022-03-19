/* eslint-disable no-unused-vars */
import React from 'react';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { doc } from 'firebase/firestore';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import EditCompanyContainer from '../../../containers/EditCompanyContainer';
import useStore from '../../../hooks/useStore';
import { uploadFile } from '../../../helpers/uploadFile';
import { firestore } from '../../../helpers/firebase';

const EditCompany = () => {
  const company = useStore((state) => state.company);
  const mutation = useFirestoreDocumentMutation(
    doc(firestore, 'companies', company.id),
    { merge: true }
  );
  const onSubmit = async (data) => {
    console.log(data);
    const { id, logoFile, ...newData } = data;
    if (data.logoFile) {
      const newLogoUrl = await uploadFile(
        data.logoFile,
        data.name,
        'companyLogos'
      );
      newData.logoUrl = newLogoUrl;
    }
    mutation.mutate(newData);
  };

  if (!company) {
    return <h6>Company data not found, please select another</h6>;
  }
  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <CardTitle>
              <IntlMessages id="forms.edit-company" />
            </CardTitle>
            <EditCompanyContainer
              company={company}
              onSubmit={(data) => onSubmit(data)}
            />
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default EditCompany;
