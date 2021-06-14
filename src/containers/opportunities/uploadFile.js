import firebase from 'firebase/app';
import { v4 as uuid } from 'uuid';

const prefix = 'https://storage.googleapis.com/loop-luck.appspot.com/';

// eslint-disable-next-line import/prefer-default-export
export const uploadFile = async (file, folderName) => {
  console.log(file.type);
  const fileExtension =
    // eslint-disable-next-line no-nested-ternary
    file.type === 'image/png'
      ? '.png'
      : file.type === 'image/jpeg'
      ? '.jpg'
      : '';
  // TODO: check if file exists
  // eslint-disable-next-line prefer-template
  const filePath = folderName + '/' + uuid() + fileExtension;
  console.log(filePath);
  const storage = firebase.storage().ref(filePath);
  await storage.put(file);
  return prefix + filePath;
};
