import { database } from '../helpers/Firebase';

export const getCandidatesList = async () => {
        //to limit our query, best practice else its expensive
        const querySnapshot = await database
            .collection('candidates')
            .get();

        const candidates = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        }));
        return candidates;
};