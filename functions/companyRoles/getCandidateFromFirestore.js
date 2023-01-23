const admin = require('firebase-admin');

const getCandidateFromFirestore = async (candidateUid) => {
  try {
    const doc = await admin
      .firestore()
      .collection('users')
      .doc(candidateUid)
      .get();

    if (!doc.exists) {
      return null;
    }

    const foundCandidate = {
      id: doc.id,
      ...doc.data(),
    };

    return foundCandidate;
  } catch (error) {
    console.error('Error: ', error);
  }
};

exports.getCandidateFromFirestore = getCandidateFromFirestore;
