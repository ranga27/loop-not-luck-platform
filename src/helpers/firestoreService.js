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
  where,
  updateDoc,
  deleteField,
  serverTimestamp,
} from 'firebase/firestore';
import { format } from 'date-fns';
import { firestore } from './Firebase';

// Create a new user document in user collection if it does not exists. Else update the document.
export async function updateUserInFirestore({ uid, ...details }) {
  return setDoc(doc(firestore, 'users', uid), details, { merge: true });
}

export async function updateRoleInFirestore({ uid, roleId, data }) {
  const roleRef = doc(firestore, 'users', uid, 'matchedRoles', roleId);
  const key = Object.keys(data)[0];
  data[key] = Timestamp.fromMillis(data[key]);
  return updateDoc(roleRef, data);
}

export async function unSaveRoleInFirestore({ uid, roleId }) {
  const roleRef = doc(firestore, 'users', uid, 'matchedRoles', roleId);
  return updateDoc(roleRef, { saved: deleteField() });
}

// TODO: Test function, move to cloud function
export async function addRoleInUserDoc(uid, role) {
  const { id, ...data } = role;
  const roleRef = doc(firestore, 'users', uid, 'matchedRoles', id);
  await setDoc(roleRef, data, { merge: true });
}

export async function setRoleInFirestore(role) {
  const { id, ...data } = role;
  const roleRef = doc(firestore, 'roles', id);
  await setDoc(roleRef, data, { merge: true });
}

export async function addOpportunityToFirestore(opportunity) {
  const docRef = await addDoc(collection(firestore, 'opportunities'));
  await addDoc(docRef, opportunity);
}

export async function fetchRolesFromFirestore(uid) {
  const roleRef = collection(firestore, 'users', uid, 'matchedRoles');
  const q = query(roleRef, where('matchedScore', '>', 0));
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

// Test function
export async function fetchOpportunitiesFromFirestore() {
  const roleRef = collection(firestore, 'opportunities');
  const querySnapshot = await getDocs(roleRef);
  const roles = querySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    company: docu.data().organisation
      ? docu.data().organisation
      : docu.data().company,
    coverLetter: docu.data().checkboxCoverLetter
      ? docu.data().checkboxCoverLetter
      : true,
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
  return firestore.collection('opportunities').doc(opportunity.id).update(opps);
}

export async function fetchUserDataFromFirestore(uid) {
  const userDocRef = doc(firestore, 'users', uid);
  const userDoc = await getDoc(userDocRef);
  const data = userDoc.data();
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof Timestamp) {
        data[prop] = data[prop].toDate().toUTCString();
      }
    }
  }
  return data;
}

export async function fetchCompanyDataFromFirestore(companyId) {
  const companyDocRef = doc(firestore, 'companies', companyId);
  const companyDoc = await getDoc(companyDocRef);
  const company = companyDoc.data();
  for (const prop in company) {
    if (company.hasOwnProperty(prop)) {
      if (company[prop] instanceof Timestamp) {
        company[prop] = company[prop].toDate().toUTCString();
      }
    }
  }
  return company;
}
export async function fetchCompaniesFromFirestore() {
  const querySnapshot = await firestore.collection('companies').get();
  const companies = querySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));
  return companies;
}

export async function doesCompanyExistInFirestore(name) {
  try {
    const querySnapshot = await firestore
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
    const { id } = await firestore.collection('companies').add(company);
    return { id, error: null };
  } catch (error) {
    console.error('Error adding company: ', error);
    return { id: null, error: error.message };
  }
}

export async function getCompanyIdFromFirestore(company) {
  const companyRef = collection(firestore, 'companies');
  const companyQuery = query(companyRef, where('name', '==', company));
  const querySnapshot = await getDocs(companyQuery);
  const companyId = querySnapshot.docs[0]?.id;
  const users = querySnapshot.docs[0]?.get('users');
  if (!companyId) {
    const { id } = await addDoc(companyRef, {
      name: company,
      createdAt: serverTimestamp(),
    });
    return { companyId: id, users: {} };
  }
  return { companyId, users };
}

export const updateCompanyInFirebase = async ({ companyId, ...data }) => {
  try {
    const companyRef = doc(firestore, 'companies', companyId);
    await setDoc(companyRef, { ...data }, { merge: true });
    return companyId;
  } catch (error) {
    return error.message;
  }
};

export const updateUserOnBoardedInFirebase = async ({ uid, ...data }) => {
  try {
    const userRef = doc(firestore, 'users', uid);
    await setDoc(userRef, { ...data }, { merge: true });
    return uid;
  } catch (error) {
    return error.message;
  }
};

export async function fetchUserMatchedRolesFromFirestore(userData) {
  const roleRef = collection(firestore, 'users', userData.id, 'matchedRoles');
  const q = query(roleRef, where('applied', '==', true));
  const querySnapshot = await getDocs(q);
  const roles = querySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
    userArray: userData,
  }));
  return roles;
}

export async function updateRoleCollection(role, company, newCompanyData) {
  const { id } = role;
  const roleRef = doc(firestore, 'roles', id);
  await setDoc(
    roleRef,
    {
      company: newCompanyData.name,
      industry: newCompanyData.industry,
      jobValues: newCompanyData.jobValues,
    },
    { merge: true }
  );
}

export async function fetchUserProfileDataFromFirestore(uid) {
  const userDocRef = doc(firestore, 'users', uid);
  const userDoc = await getDoc(userDocRef);
  const data = userDoc.data();
  return data;
}
