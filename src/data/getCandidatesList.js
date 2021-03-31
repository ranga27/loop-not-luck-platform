import { db } from '../helpers/Firebase';

const getCandidatesList = async () => {
  // To limit our query, best practice else its expensive
  const querySnapshot = await db.collection('candidates').get();

  const candidates = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return candidates;
};

export default getCandidatesList;
