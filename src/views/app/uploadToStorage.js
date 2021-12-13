/* eslint-disable import/prefer-default-export */
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import Swal from 'sweetalert2';
import { storageRootUrl } from '../../constants/defaultValues';

// TODO: move showError to Container, uploadToStorage should be a pure function
const showError = (text) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text,
  });
};

export const uploadToStorage = async (data) => {
  const { cv, uid, firstName, ...rest } = data;

  // TODO: move file type & file size validation to onChange event of the CustomInput
  if (cv.type !== 'application/pdf') {
    showError('Only PDF files allowed');
    return null;
  }
  if (cv.size / 1000000 > 1) {
    showError('Please reduce the file size to less than 1MB');
    return null;
  }
  const storage = getStorage();
  const storageRef = ref(storage, `cv/${uid}/${firstName}.pdf`);
  await uploadBytes(storageRef, cv);
  Object.assign(rest, {
    cvUrl: storageRootUrl + storageRef.fullPath,
    cvUploadDate: new Date(Date.now()),
  });
  return { uid, firstName, ...rest };
};
