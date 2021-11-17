import firebase from 'firebase/app';
import { updateUserInFirestore } from './firestoreService';

export async function registerInFirebase(email, password, role) {
  try {
    // Create a new user account
    const userCred = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const { uid } = userCred.user;
    const updateRoleFunction = firebase
      .functions()
      .httpsCallable('setUserRole');
    updateRoleFunction({ uid, role });
    updateUserInFirestore({
      uid,
      email,
      role,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return uid;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function registerInFirestore(email, password) {
  try {
    // Create a new user account
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
