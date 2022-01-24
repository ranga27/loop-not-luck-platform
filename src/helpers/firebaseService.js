/* eslint-disable no-unused-vars */
import {
  updateProfile,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { serverTimestamp } from 'firebase/firestore';
import { auth, functions } from './Firebase';
import {
  fetchUserDataFromFirestore,
  updateCompanyInFirestore,
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

export async function sendJobsEmail(data) {
  const sendJobsFunction = httpsCallable(functions, 'sendJobs');
  return sendJobsFunction(data);
}

export async function setUserRole(data) {
  const updateRoleFunction = httpsCallable(functions, 'setUserRole');
  return updateRoleFunction(data);
}

export async function registerInFirebase({
  email,
  password,
  firstName,
  role,
  company,
}) {
  try {
    // Create a new user account in firebase auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid } = userCredential.user;
    // Set user role in firebase auth
    setUserRole({ uid, role });
    // Update user name in firebase auth
    updateProfile(auth.currentUser, { displayName: firstName });
    // Create user document in firestore
    if (role === 'company') {
      updateCompanyInFirestore({ company, uid, firstName, email });
    }
    updateUserInFirestore({
      uid,
      email,
      role,
      firstName,
      createdAt: serverTimestamp(),
      isOnboarded: false,
      hasCompletedProfile: false,
    });
    return uid;
  } catch (error) {
    console.error('Could not register user');
    throw error;
  }
}

export async function signInWithEmail({ email, password }) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid, emailVerified } = userCredential.user;
    if (emailVerified) {
      const user = await fetchUserDataFromFirestore(uid);
      return { uid, emailVerified, ...user };
    }
    return new Error('Email Verification pending, please check your emails');
  } catch (error) {
    console.error('Could not sign in');
    throw error;
  }
}
