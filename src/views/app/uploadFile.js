/* eslint-disable import/prefer-default-export */
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import Swal from 'sweetalert2';
import { storageRootUrl } from '../../constants/defaultValues';

// TODO: move showError to Container, uploadFile should be a pure function
const showError = (text) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text,
  });
};

export const uploadFile = async (file, uid, firstName) => {
  try {
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
    const cvUrl = storageRootUrl + storageRef.fullPath;
    const cvUploadDate = new Date(Date.now());
    return { cvUrl, cvUploadDate };
  } catch (error) {
    console.log(error);
    return null;
  }
};
