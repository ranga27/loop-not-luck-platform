import { slashPathToFirestoreRef, deleteCollection, isDocPath } from './firebase-utils';
/**
 * @param baseRef - Base RTDB reference
 * @param options - Options for ref
 * @returns RTDB Reference
 */
function optionsToRtdbRef(baseRef, options) {
  let newRef = baseRef;
  ['orderByChild', 'orderByKey', 'orderByValue', 'equalTo', 'startAfter', 'startAt', 'endBefore', 'endAt', 'limitToFirst', 'limitToLast'].forEach(optionName => {
    if (options && options[optionName]) {
      const args = options[optionName];
      // Spread arg arrays (such as startAfter and endBefore)
      if (Array.isArray(args)) {
        newRef = newRef[optionName](...args);
      } else {
        newRef = newRef[optionName](args);
      }
    }
  });
  return newRef;
}
/**
 * Get Firebase Auth or TenantAwareAuth instance, based on tenantId being provided
 * @param adminInstance - Admin SDK instance
 * @param tenantId - Optional ID of tenant used for multi-tenancy
 * @returns Firebase Auth or TenantAwareAuth instance
 */
function getAuth(adminInstance, tenantId) {
  const auth = tenantId ? adminInstance.auth().tenantManager().authForTenant(tenantId) : adminInstance.auth();
  return auth;
}
/**
 * Convert unique data types which have been stringified and parsed back
 * into their original type.
 * @param dataVal - Value of data
 * @param firestoreStatics - Statics from firestore instance
 * @returns Value converted into timestamp object if possible
 */
export function convertValueToTimestampOrGeoPointIfPossible(dataVal, firestoreStatics) {
  /* eslint-disable no-underscore-dangle */
  if (dataVal?._methodName === 'serverTimestamp' || dataVal?._methodName === 'FieldValue.serverTimestamp' // v8 and earlier
  ) {
    return firestoreStatics.FieldValue.serverTimestamp();
  }
  if (dataVal?._methodName === 'deleteField' || dataVal?._methodName === 'FieldValue.delete' // v8 and earlier
  ) {
    return firestoreStatics.FieldValue.delete();
  }
  /* eslint-enable no-underscore-dangle */
  if (typeof dataVal?.seconds === 'number' && typeof dataVal?.nanoseconds === 'number') {
    return new firestoreStatics.Timestamp(dataVal.seconds, dataVal.nanoseconds);
  }
  if (typeof dataVal?.latitude === 'number' && typeof dataVal?.longitude === 'number') {
    return new firestoreStatics.GeoPoint(dataVal.latitude, dataVal.longitude);
  }
  return dataVal;
}
/**
 * @param data - Data to be set in firestore
 * @param firestoreStatics - Statics from Firestore object
 * @returns Data to be set in firestore with timestamp
 */
function getDataWithTimestampsAndGeoPoints(data, firestoreStatics) {
  // Exit if no statics are passed
  if (!firestoreStatics) {
    return data;
  }
  return Object.entries(data).reduce((acc, [currKey, currData]) => {
    // Convert nested timestamp if item is an object
    if (typeof currData === 'object' && currData !== null && !Array.isArray(currData) && /* eslint-disable-next-line no-underscore-dangle */
    !currData._methodName && !currData.seconds && !(currData.latitude && currData.longitude)) {
      return {
        ...acc,
        [currKey]: getDataWithTimestampsAndGeoPoints(currData, firestoreStatics)
      };
    }
    const value = Array.isArray(currData) ? currData.map(dataItem => {
      const result = convertValueToTimestampOrGeoPointIfPossible(dataItem, firestoreStatics);
      return result.constructor === Object ? getDataWithTimestampsAndGeoPoints(result, firestoreStatics) : result;
    }) : convertValueToTimestampOrGeoPointIfPossible(currData, firestoreStatics);
    return {
      ...acc,
      [currKey]: value
    };
  }, {});
}
/**
 * @param adminInstance - firebase-admin instance
 * @param action - Action to run
 * @param actionPath - Path in RTDB
 * @param options - Query options
 * @param data - Data to pass to action
 * @returns Promise which resolves with results of calling RTDB
 */
export async function callRtdb(adminInstance, action, actionPath, options, data) {
  // Handle actionPath not being set (see #244 for more info)
  if (!actionPath) {
    throw new Error('actionPath is required for callRtdb. Use "/" for top level actions.');
  }
  try {
    const dbRef = adminInstance.database().ref(actionPath);
    if (action === 'get') {
      const snap = await optionsToRtdbRef(dbRef, options).once('value');
      return snap.val();
    }
    if (action === 'push') {
      const pushRef = dbRef.push();
      await pushRef.set(data);
      // TODO: Return key on an object for consistent return regardless of action
      return pushRef.key;
    }
    // Delete action
    const actionNameMap = {
      delete: 'remove'
    };
    const cleanedActionName = actionNameMap[action] || action;
    await dbRef[cleanedActionName](data);
    // Prevents Cypress error with message:
    // "You must return a promise, a value, or null to indicate that the task was handled."
    return null;
  } catch (err) {
    /* eslint-disable no-console */
    console.error(`cypress-firebase: Error with RTDB "${action}" at path "${actionPath}" :`, err);
    /* eslint-enable no-console */
    throw err;
  }
}
/**
 * @param adminInstance - firebase-admin instance
 * @param action - Action to run
 * @param actionPath - Path to collection or document within Firestore
 * @param options - Query options
 * @param data - Data to pass to action
 * @returns Promise which resolves with results of calling Firestore
 */
export async function callFirestore(adminInstance, action, actionPath, options, data) {
  try {
    if (action === 'get') {
      const snap = await slashPathToFirestoreRef(adminInstance.firestore, actionPath, options).get();
      if (snap?.docs?.length && typeof snap.docs.map === 'function') {
        return snap.docs.map(docSnap => ({
          ...docSnap.data(),
          id: docSnap.id
        }));
      }
      // Falling back to null in the case of falsey value prevents Cypress error with message:
      // "You must return a promise, a value, or null to indicate that the task was handled."
      return typeof snap?.data === 'function' && snap.data() || null;
    }
    if (action === 'delete') {
      // Handle deleting of collections & sub-collections if not a doc path
      const deletePromise = isDocPath(actionPath) ? slashPathToFirestoreRef(adminInstance.firestore, actionPath, options).delete() : deleteCollection(adminInstance.firestore(), slashPathToFirestoreRef(adminInstance.firestore, actionPath, options), options);
      await deletePromise;
      // Returning null in the case of falsey value prevents Cypress error with message:
      // "You must return a promise, a value, or null to indicate that the task was handled."
      return null;
    }
    if (!data) {
      throw new Error(`You must define data to run ${action} in firestore.`);
    }
    const dataToSet = getDataWithTimestampsAndGeoPoints(data,
    // Use static option if passed (tests), otherwise fallback to statics on adminInstance
    // Tests do not have statics since they are using @firebase/testing
    options?.statics || adminInstance.firestore);
    if (action === 'set') {
      return adminInstance.firestore().doc(actionPath).set(dataToSet, options?.merge ? {
        merge: options?.merge
      } : undefined);
    }
    // "update" and "add" action
    return slashPathToFirestoreRef(adminInstance.firestore, actionPath, options)[action](dataToSet);
  } catch (err) {
    /* eslint-disable no-console */
    console.error(`cypress-firebase: Error with Firestore "${action}" at path "${actionPath}" :`, err);
    /* eslint-enable no-console */
    throw err;
  }
}
/**
 * Create a custom token
 * @param adminInstance - Admin SDK instance
 * @param uid - UID of user for which the custom token will be generated
 * @param settings - Settings object
 * @returns Promise which resolves with a custom Firebase Auth token
 */
export function createCustomToken(adminInstance, uid, settings) {
  // Use custom claims or default to { isTesting: true }
  const customClaims = settings?.customClaims || {
    isTesting: true
  };
  // Create auth token
  return getAuth(adminInstance, settings.tenantId).createCustomToken(uid, customClaims);
}
/**
 * Get Firebase Auth user based on UID
 * @param adminInstance - Admin SDK instance
 * @param uid - UID of user for which the custom token will be generated
 * @param tenantId - Optional ID of tenant used for multi-tenancy
 * @returns Promise which resolves with a custom Firebase Auth token
 */
export function getAuthUser(adminInstance, uid, tenantId) {
  return getAuth(adminInstance, tenantId).getUser(uid);
}