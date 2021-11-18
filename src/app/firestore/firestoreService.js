import { doc, collection, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../../helpers/Firebase';

// Create a new user document in user collection if it does not exists. Else update the document.
export async function updateUserInFirestore(user) {
  const { uid, ...details } = user;
  const userRef = doc(db, 'users', uid);
  setDoc(userRef, details, { merge: true });
}

export async function addOpportunityToFirestore(opportunity) {
  const docRef = await addDoc(collection(db, 'opportunities'));
  await addDoc(docRef, opportunity);
}

export async function fetchRolesFromFirestore() {
  const querySnapshot = await db.collection('opportunities').get();
  const roles = querySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));
  return roles;
}

export async function updateOpportunityInFirestore(opportunity) {
  const { id, ...opps } = opportunity;
  return db.collection('opportunities').doc(opportunity.id).update(opps);
}

export async function fetchUserDataFromFirestore(uid) {
  return db.collection('users').doc(uid).get();
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
