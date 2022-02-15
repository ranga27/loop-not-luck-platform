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

const uploadFile = async (data) => {
  try {
    // Only upload if CV is submitted
    if (data.cv) {
      if (data.cvUploadDate) {
        const overWrite = await confirmOverwrite();
        if (overWrite.isConfirmed) {
          return await uploadToStorage(data);
        }
      } else return await uploadToStorage(data);
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
