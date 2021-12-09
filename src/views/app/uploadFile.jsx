/* eslint-disable import/prefer-default-export */
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import Swal from 'sweetalert2';
import { storageRootUrl } from '../../constants/defaultValues';

const showError = (text) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text,
  });
};
export const uploadFile = async (file, uid, firstName) => {
  const storage = getStorage();
  const storageRef = ref(storage, `cv/${uid}/${firstName}.pdf`);
  if (file.type !== 'application/pdf') {
    showError('Only PDF files allowed');
    return null;
  }
  if (file.size / 1000000 > 1) {
    showError('Please reduce the file size to less than 1MB');
    return null;
  }
  await uploadBytes(storageRef, file);
  return storageRootUrl + storageRef.fullPath;
};
