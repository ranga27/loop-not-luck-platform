import { db, dbMobileApp } from '../../helpers/Firebase';
// eslint-disable-next-line import/prefer-default-export
export function addOpportunityToFirestore(opportunity) {
  return db.collection('opportunities').add(opportunity);
}
export async function addOpportunityToMobileAppFirestore(opportunity) {
  return dbMobileApp.collection('opportunities').add(opportunity);
}

export async function fetchOpportunitiesFromFirestore() {
  const querySnapshot = await db.collection('opportunities').get();
  const opportunities = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return opportunities;
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
