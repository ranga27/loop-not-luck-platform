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

export async function updateOpportunityToFirestore(opportunity) {
  return db.collection('opportunities').doc(opportunity.id).update(opportunity);
}

export async function updateOpportunityToMobileAppFirestore(opportunity) {
  return dbMobileApp
    .collection('opportunities')
    .doc(opportunity.id)
    .set({ opportunity }, { merge: true });
}
