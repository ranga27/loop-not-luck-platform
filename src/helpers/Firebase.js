import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';
import { firebaseConfig, mobileAppConfig } from '../constants/defaultValues';

const mobileApp = firebase.initializeApp(mobileAppConfig, 'loop-not-luck-app');

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const dbMobileApp = mobileApp.firestore();

firebase.functions().useEmulator('localhost', 5001);

export { auth, db, dbMobileApp };
