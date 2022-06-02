import {
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import { collection, doc, query, serverTimestamp } from 'firebase/firestore';
import React from 'react';
import Swal from 'sweetalert2';
import EditRoleForm from '../../components/form/EditRoleForm';
import { firestore } from '../../helpers/Firebase';
import { formatDateInArray } from '../../helpers/Utils';
import useRoleStore from '../../hooks/useRoleStore';

const RoleDetailsContainer = () => {
  const role = useRoleStore((state) => state.role);
  const mutation = useFirestoreDocumentMutation(
    doc(firestore, 'roles', role.id),
    {
      merge: true,
    }
  );
  const { isLoading, data: companies } = useFirestoreQuery(
    ['companies'],
    query(collection(firestore, 'companies')),
    {
      subscribe: true,
    },
    {
      // React Query data selector
      select(snapshot) {
        const companiesData = snapshot.docs.map((document) => ({
          label: document.data().name,
          value: document.data().name,
          id: document.id,
          industry: document.data().industry,
          jobValues: document.data().jobValues,
        }));
        return formatDateInArray(companiesData);
      },
    }
  );
  if (isLoading || !role) {
    return <div className="loading" />;
  }
  const onSubmit = async (data) => {
    const companyData = companies.filter((x) => x.label === data.company);

    const { jobValues, industry, id } = companyData[0];
    const updatePost = {
      ...data,
      updatedAt: serverTimestamp(),
      jobValues,
      industry,
      companyId: id,
    };
    console.log('SUBMIT: ', updatePost);
    mutation.mutate(updatePost, {
      onSuccess() {
        Swal.fire('Updated!', 'Company Data Updated.', 'success');
      },
      onError(error) {
        Swal.fire('Oops!', 'Failed to Update Company.', 'error');
        console.error(error);
      },
      onMutate() {
        console.info('Updating document...');
      },
    });
  };
  return (
    <EditRoleForm
      role={role}
      companies={companies}
      onSubmit={(data) => onSubmit(data)}
    />
  );
};
export default RoleDetailsContainer;
