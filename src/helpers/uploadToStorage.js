/* eslint-disable import/prefer-default-export */
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { storageRootUrl } from '../constants/defaultValues';

export const uploadToStorage = async (data) => {
  const { cv, firstName, ...rest } = data;
  const uid = uuidv4();
  const storage = getStorage();
  const storageRef = ref(storage, `cv/${uid}/${firstName}.pdf`);
  await uploadBytes(storageRef, cv);
  Object.assign(rest, {
    cvUrl: storageRootUrl + storageRef.fullPath,
    cvUploadDate: new Date(Date.now()),
  });
  return { uid, firstName, ...rest };
};
