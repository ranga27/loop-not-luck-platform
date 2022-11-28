import Swal from 'sweetalert2';
import { uploadToStorage } from '../helpers/uploadToStorage';

async function confirmOverwrite() {
  return Swal.fire({
    title: 'CV exists',
    text: 'Do you want to overwrite it with the new file?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, overwrite it!',
  });
}

async function confirmSubmitWithoutCV() {
  return Swal.fire({
    title: 'Submit without CV?',
    text: 'Make sure to upload your CV or you will not be able to apply for roles!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, submit it!',
  });
}

const uploadFile = async (data) => {
  try {
    if (!data.cv) {
      const { isDismissed } = await confirmSubmitWithoutCV();

      if (isDismissed) return null;

      const { cv, uid, ...rest } = data;
      return rest;
    }

    // Only upload if CV is submitted
    if (data.cv) {
      if (data.cvUploadDate) {
        const overWrite = await confirmOverwrite();
        if (overWrite.isConfirmed) {
          return await uploadToStorage(data);
        }
      } else {
        return await uploadToStorage(data);
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
  // return data except cv & uid
  const { cv, uid, ...rest } = data;
  return rest;
};

export default uploadFile;
