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
  getCompanyIdFromFirestore,
  updateCompanyInFirebase,
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
    // Get company ID from firestore
    if (role === 'employer') {
      const { companyId, users } = await getCompanyIdFromFirestore(company);
      // Since append to map is not possible in firebase
      updateCompanyInFirebase({
        companyId,
        users: { [`${uid}`]: { firstName, email }, ...users },
      });
      updateUserInFirestore({
        uid,
        email,
        role,
        firstName,
        createdAt: serverTimestamp(),
        isOnboarded: false,
        hasCompletedProfile: false,
        company,
        companyId,
      });
      return uid;
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
