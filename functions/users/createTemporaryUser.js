import * as admin from 'firebase-admin';
import { v4 as uuid } from 'uuid';

export const createTemporaryUser = async (authUid, newUserInfo) => {
    const store = admin.firestore();
    const {
        emailAddress,
        firstName,
        lastName,
        role,
    } = newUserInfo;
    const confirmationHash = uuid();
    const createdAt = Date.now();
    const tempUserInfo = {
        authUid,
        emailAddress,
        firstName,
        lastName,
        role,
        confirmationHash,
        createdAt,
    };

    return store.collection('temporaryUsers').doc().set(tempUserInfo);
}