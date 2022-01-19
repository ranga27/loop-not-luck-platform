/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { firebaseConfig } from '../constants/defaultValues';

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const functions = getFunctions(firebaseApp);

// TODO: switch to development environment using const { NODE_ENV } = process.env;
connectFunctionsEmulator(functions, 'localhost', 5001);

export { auth, db, functions };
