import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { serverTimestamp } from 'firebase/firestore';
import { auth, functions } from '../../helpers/Firebase';
import { updateUserInFirestore } from './firestoreService';

export async function verifyEmail() {
  // TODO: implement custom template
  return sendEmailVerification(auth.currentUser);
}

export async function getUsersList() {
  const getUsersListFunction = httpsCallable(functions, 'getUsersList');
  const results = await getUsersListFunction();
  return results.data;
}

export async function setUserRole(uid, role) {
  const updateRoleFunction = httpsCallable(functions, 'setUserRole');
  return updateRoleFunction({ uid, role });
}

export async function registerInFirebase(email, password, role) {
  try {
    // Create a new user account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid } = userCredential.user;
    setUserRole(uid, role);
    updateUserInFirestore({
      uid,
      email,
      role,
      createdAt: serverTimestamp(),
    });
    return uid;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
