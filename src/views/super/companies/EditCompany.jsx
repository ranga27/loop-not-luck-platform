/* eslint-disable no-unused-vars */
import React from 'react';
import {
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import { doc, serverTimestamp, collection, query } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import Swal from 'sweetalert2';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import EditCompanyForm from '../../../components/form/EditCompanyForm';
import useCompanyStore from '../../../hooks/useCompanyStore';
import { uploadFile } from '../../../helpers/uploadFile';
import { firestore } from '../../../helpers/Firebase';
import { formatDateInArray } from '../../../helpers/Utils';
import { updateRoleCollection } from '../../../helpers/firestoreService';

const EditCompany = () => {
  const company = useCompanyStore((state) => state.company);
  const navigate = useNavigate();
  const mutation = useFirestoreDocumentMutation(
    doc(firestore, 'companies', company.id),
    { merge: true }
  );

  const { isLoading, data: roles } = useFirestoreQuery(
    ['roles'],
    query(collection(firestore, 'roles')),
    {
      subscribe: true,
    },
    {
      // React Query data selector
      select(snapshot) {
        const companiesData = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));
        return formatDateInArray(companiesData);
      },
    }
  );

  if (isLoading) {
    return <div className="loading" />;
  }

  const onSubmit = async (data) => {
    const companyData = roles.filter((x) => x.company === company.name);
    companyData.forEach((item) => {
      updateRoleCollection(item, company, data).then((results) => {
        if (results.length > 0) {
          console.log(results);
        }
        return null;
      });
    });

    const { id, logoFile, ...newData } = {
      ...data,
      updatedAt: serverTimestamp(),
    };
    if (data.logoFile) {
      const newLogoUrl = await uploadFile(
        data.logoFile,
        data.name,
        'companyLogos'
      );
      newData.logoUrl = newLogoUrl;
    }
    mutation.mutate(newData, {
      onSuccess() {
        Swal.fire('Updated!', 'Company Data Updated.', 'success');
        navigate('/app/companies');
        window.setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
      onError(error) {
        Swal.fire('Oops!', 'Failed to Update Company.', 'error');
      },
      onMutate() {
        console.info('Updating document...');
      },
    });
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
            <EditCompanyForm
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
