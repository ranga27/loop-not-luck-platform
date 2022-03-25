import {
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import { collection, doc, query, serverTimestamp } from 'firebase/firestore';
import React from 'react';
import Swal from 'sweetalert2';
import EditRoleForm from '../../components/form/EditRoleForm';
import { firestore } from '../../helpers/firebase';
import { formatDateInArray } from '../../helpers/utils';
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
        }));
        return formatDateInArray(companiesData);
      },
    }
  );
  const onSubmit = async (data) => {
    const updatePost = { ...data, updatedAt: serverTimestamp() };
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
  if (isLoading || !role) {
    return <div className="loading" />;
  }
  return (
    <EditRoleForm
      role={role}
      companies={companies}
      onSubmit={(data) => onSubmit(data)}
    />
  );
};
export default RoleDetailsContainer;
