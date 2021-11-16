/* eslint-disable object-shorthand */
/* eslint-disable import/prefer-default-export */
import firebase from 'firebase/app';
import { updateUserInFirestore } from './firestoreService';

export async function registerInFirebase(user) {
  const { email, password, firstName, role } = user;
  try {
    // Create a new user account
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const { uid } = result.user;
    updateUserInFirestore({ uid, firstName, email, role });
    const setRole = { role: role };
    const updateRoleFunction = firebase
      .functions()
      .httpsCallable('setUserRole');
    return updateRoleFunction({ uid, setRole });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
