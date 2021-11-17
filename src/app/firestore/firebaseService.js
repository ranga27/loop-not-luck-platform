/* eslint-disable object-shorthand */
/* eslint-disable import/prefer-default-export */
import firebase from 'firebase/app';
import { updateUserInFirestore } from './firestoreService';

export async function registerInFirebase(user) {
  const { email, password, firstName, role, customClaims } = user;
  const updateRoleFunction = firebase.functions().httpsCallable('setUserRole');
  try {
    // Create a new user account
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const { uid } = result.user;
    updateRoleFunction({ uid, customClaims });
    return updateUserInFirestore({ uid, firstName, email, role });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
