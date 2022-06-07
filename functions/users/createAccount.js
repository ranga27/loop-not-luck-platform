//this is the function that FE will call when new user signs up
import * as functions from 'firebase-functions';
import { createAuthUser } from './createAuthUser';
import { createTemporaryUser } from './createTemporaryUser';

export const createAccount = functions.https.onCall(async (data, context) => {
        //get new user info sent by FE in the request
        const newUserInfo  = data;
        
        //create new user in firebase auth
        const authUid = await createAuthUser(newUserInfo);
        
        //create temp user doc inside temp user collection until email verified
        await createTemporaryUser(authUid, newUserInfo);
        
        //TODO: add an alert to send to admin when new users signup
});