import {
  updateProfile,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { serverTimestamp } from 'firebase/firestore';
import { auth, functions } from '../../helpers/Firebase';
import {
  fetchUserDataFromFirestore,
  updateUserInFirestore,
} from './firestoreService';

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

export async function registerInFirebase({ email, password, firstName, role }) {
  try {
    // Create a new user account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid } = userCredential.user;
    updateProfile(auth.currentUser, { displayName: firstName });
    setUserRole(uid, role);
    updateUserInFirestore({
      uid,
      email,
      role,
      firstName,
      createdAt: serverTimestamp(),
    });
    return uid;
  } catch (error) {
    console.error('Could not register user: ', error);
    throw error;
  }
}

export async function signInWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { emailVerified, uid } = userCredential.user;
    if (emailVerified) {
      const user = await fetchUserDataFromFirestore(uid);
      return { ...user, emailVerified };
    }
    return new Error('Email Verification pending, please check your emails');
  } catch (error) {
    console.error('Could not sign in');
    throw error;
  }
}
