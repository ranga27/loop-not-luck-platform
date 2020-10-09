import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { firebaseConfig } from '../constants/defaultValues';

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.firestore();

export { auth, database };
