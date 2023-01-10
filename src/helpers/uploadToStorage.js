/* eslint-disable import/prefer-default-export */
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { storageRootUrl } from '../constants/defaultValues';

export const uploadToStorage = async (data) => {
  const { cv, firstName, uid, ...rest } = data;
  const storage = getStorage();
  const storageRef = ref(storage, `cv/${uid}/${firstName}.pdf`);
  await uploadBytes(storageRef, cv);
  Object.assign(rest, {
    cvUrl: storageRootUrl + storageRef.fullPath,
    cvUploadDate: new Date(Date.now()),
  });
  return { uid, firstName, ...rest };
};
