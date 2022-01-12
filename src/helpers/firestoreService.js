/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import {
  doc,
  query,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  Timestamp,
  collection,
} from 'firebase/firestore';
import { format } from 'date-fns';
import { db } from './Firebase';
// Create a new user document in user collection if it does not exists. Else update the document.
export async function updateUserInFirestore({ uid, ...details }) {
  return setDoc(doc(db, 'users', uid), details, { merge: true });
}

// Test function, delete or move to separate file
export async function addRoleInUserDoc(uid, role) {
  const { id, ...data } = role;
  const roleRef = doc(db, 'users', uid, 'matchedRoles', role.id);
  return setDoc(roleRef, data, { merge: true });
}

export async function addOpportunityToFirestore(opportunity) {
  const docRef = await addDoc(collection(db, 'opportunities'));
  await addDoc(docRef, opportunity);
}

export async function fetchRolesFromFirestore() {
  const q = query(collection(db, 'opportunities'));
  const querySnapshot = await getDocs(q);
  const roles = querySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));
  roles.forEach((role) => {
    for (const prop in role) {
      // TODO: combine all date castings
      if (role.hasOwnProperty(prop)) {
        if (role[prop] instanceof Timestamp) {
          role[prop] = format(new Date(role[prop].toDate()), 'dd-MMM-yyyy');
        }
      }
    }
  });
  return roles;
}

export async function updateOpportunityInFirestore(opportunity) {
  const { id, ...opps } = opportunity;
  return db.collection('opportunities').doc(opportunity.id).update(opps);
}

export async function fetchUserDataFromFirestore(uid) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof Timestamp) {
        data[prop] = data[prop].toDate().toUTCString();
      }
    }
  }
  return data;
}

export async function fetchCompaniesFromFirestore() {
  const querySnapshot = await db.collection('companies').get();
  const companies = querySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));
  return companies;
}

export async function doesCompanyExistInFirestore(name) {
  try {
    const querySnapshot = await db
      .collection('companies')
      .where('name', '==', name)
      .get();
    if (querySnapshot.size > 0) {
      console.log('Company exists', querySnapshot);
    } else console.log('Company does not exist', querySnapshot);
  } catch (error) {
    console.error(error);
  }
}

export async function addCompanyToFirestore(company) {
  try {
    const { id } = await db.collection('companies').add(company);
    return { id, error: null };
  } catch (error) {
    console.error('Error adding company: ', error);
    return { id: null, error: error.message };
  }
}

export async function updateCompanyInFirestore(company) {
  const { id, ...comp } = company;
  return db.collection('companies').doc(id).set(comp, { merge: true });
}
