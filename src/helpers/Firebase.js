/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { firebaseConfig } from '../constants/defaultValues';

const firebase = initializeApp(firebaseConfig);

const auth = getAuth(firebase);
const firestore = getFirestore(firebase);
const functions = getFunctions(firebase);

if (process.env.NODE_ENV !== 'production') {
  connectFunctionsEmulator(functions, 'localhost', 5001);
  connectFirestoreEmulator(firestore, 'localhost', 8080);
}

export { auth, firestore, functions };
