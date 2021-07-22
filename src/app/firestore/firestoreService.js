import { db, dbMobileApp } from '../../helpers/Firebase';
// eslint-disable-next-line import/prefer-default-export
export function addOpportunityToFirestore(opportunity) {
  return db.collection('opportunities').add(opportunity);
}
export async function addOpportunityToMobileAppFirestore(opportunity) {
  return dbMobileApp.collection('opportunities').add(opportunity);
}

export async function fetchRolesFromFirestore() {
  const querySnapshot = await db.collection('opportunities').get();
  const roles = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return roles;
}

export async function updateOpportunityInFirestore(opportunity) {
  const { id, ...opps } = opportunity;
  return db.collection('opportunities').doc(opportunity.id).update(opps);
}

export async function updateOpportunityInMobileAppFirestore(opportunity) {
  const { id, ...opps } = opportunity;
  return dbMobileApp
    .collection('opportunities')
    .doc(opportunity.id)
    .set(opps, { merge: true });
}

export async function updateUserInFirestore(user) {
  const { uid, ...details } = user;
  return db.collection('users').doc(uid).set(details, { merge: true });
}

export async function fetchUserDataFromFirestore(uid) {
  return db.collection('users').doc(uid).get();
}

export async function fetchCompaniesFromFirestore() {
  const querySnapshot = await db.collection('companies').get();
  const companies = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
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
