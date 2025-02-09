/**
 * Get String representing the type for the provided value
 * @param value - Value for which to get type string
 * @returns String representing a type
 */
function getTypeStr(value) {
  if (Array.isArray(value)) {
    return 'array';
  }
  if (typeof value === 'object' && value instanceof Date) {
    return 'date';
  }
  return typeof value;
}
/**
 * @param auth - firebase auth instance
 * @param customToken - Custom token to use for login
 * @returns Promise which resolves with the user auth object
 */
function loginWithCustomToken(auth, customToken) {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(auth => {
      if (auth) {
        resolve(auth);
      }
    });
    auth.signInWithCustomToken(customToken).catch(reject);
  });
}
/**
 * Attach custom commands including cy.login, cy.logout, cy.callRtdb,
 * @param context - Context values passed from Cypress environment
 * custom command attachment
 * @param options - Custom command options
 */
export default function attachCustomCommands(context, options) {
  const {
    Cypress,
    cy,
    firebase,
    app
  } = context;
  const defaultApp = app || firebase.app(); // select default  app
  /**
   * Get firebase auth instance, with tenantId set if provided
   * @param tenantId Optional tenant ID
   * @returns firebase auth instance
   */
  function getAuth(tenantId) {
    const auth = defaultApp.auth();
    if (tenantId) {
      auth.tenantId = tenantId;
    }
    return auth;
  }
  /**
   * Login to Firebase auth as a user with either a passed uid or the TEST_UID
   * environment variable. A custom auth token is generated using firebase-admin
   * authenticated with serviceAccount.json or SERVICE_ACCOUNT env var.
   * @name cy.login
   */
  Cypress.Commands.add(options?.commandNames?.login || 'login', (uid, customClaims, tenantId = Cypress.env('TEST_TENANT_ID')) => {
    const userUid = uid || Cypress.env('TEST_UID');
    // Handle UID which is passed in
    if (!userUid) {
      throw new Error('uid must be passed or TEST_UID set within environment to login');
    }
    const auth = getAuth(tenantId);
    // Resolve with current user if they already exist
    if (auth.currentUser && userUid === auth.currentUser.uid) {
      cy.log('Authed user already exists, login complete.');
      return undefined;
    }
    cy.log('Creating custom token for login...');
    // Generate a custom token using createCustomToken task (if tasks are enabled) then login
    return cy.task('createCustomToken', {
      uid: userUid,
      customClaims,
      tenantId
    }).then(customToken => loginWithCustomToken(auth, customToken));
  });
  /**
   * Log out of Firebase instance
   * @name cy.logout
   * @see https://github.com/prescottprue/cypress-firebase#cylogout
   * @example
   * cy.logout()
   */
  Cypress.Commands.add(options?.commandNames?.logout || 'logout', (tenantId = Cypress.env('TEST_TENANT_ID')) => new Promise((resolve, reject) => {
    const auth = getAuth(tenantId);
    auth.onAuthStateChanged(auth => {
      if (!auth) {
        resolve();
      }
    });
    auth.signOut().catch(reject);
  }));
  /**
   * Call Real Time Database path with some specified action. Leverages callRtdb
   * Cypress task which calls through firebase-admin.
   * @param action - The action type to call with (set, push, update, remove)
   * @param actionPath - Path within RTDB that action should be applied
   * @param options - Options
   * @name cy.callRtdb
   */
  Cypress.Commands.add(options?.commandNames?.callRtdb || 'callRtdb', (action, actionPath, dataOrOptions, options) => {
    const taskSettings = {
      action,
      path: actionPath
    };
    // Add data only for write actions
    if (['set', 'update', 'push'].includes(action)) {
      // If exists, create a copy to original object is not modified
      const dataIsObject = getTypeStr(dataOrOptions) === 'object';
      const dataToWrite = dataIsObject ? {
        ...dataOrOptions
      } : dataOrOptions;
      // Add metadata to dataToWrite if specified by options
      if (dataIsObject && options?.withMeta) {
        if (!dataToWrite.createdBy && Cypress.env('TEST_UID')) {
          dataToWrite.createdBy = Cypress.env('TEST_UID');
        }
        if (!dataToWrite.createdAt) {
          dataToWrite.createdAt = firebase.database.ServerValue.TIMESTAMP;
        }
      }
      taskSettings.data = dataToWrite;
    }
    // Use third argument as options for get action
    if (action === 'get') {
      taskSettings.options = dataOrOptions;
    } else if (options) {
      // Attach options if they exist
      taskSettings.options = options;
    }
    return cy.task('callRtdb', taskSettings);
  });
  /**
   * Call Firestore instance with some specified action.  Leverages callFirestore
   * Cypress task which calls through firebase-admin.
   * @param action - The action type to call with (set, push, update, remove)
   * @param actionPath - Path within RTDB that action should be applied
   * @param options - Options
   * @name cy.callFirestore
   */
  Cypress.Commands.add(options?.commandNames?.callFirestore || 'callFirestore', (action, actionPath, dataOrOptions, options) => {
    const taskSettings = {
      action,
      path: actionPath
    };
    // Add data only for write actions
    if (['set', 'update', 'add'].includes(action)) {
      // If data is an object, create a copy to original object is not modified
      const dataIsObject = getTypeStr(dataOrOptions) === 'object';
      const dataToWrite = dataIsObject ? {
        ...dataOrOptions
      } : dataOrOptions;
      // Add metadata to dataToWrite if specified by options
      if (dataIsObject && options?.withMeta) {
        if (!dataToWrite.createdBy) {
          dataToWrite.createdBy = Cypress.env('TEST_UID');
        }
        if (!dataToWrite.createdAt) {
          dataToWrite.createdAt = firebase.firestore.Timestamp.now();
        }
      }
      taskSettings.data = dataToWrite;
    }
    // Use third argument as options for get and delete actions
    if (action === 'get' || action === 'delete') {
      taskSettings.options = dataOrOptions;
    } else if (options) {
      // Attach options if they exist
      taskSettings.options = options;
    }
    return cy.task('callFirestore', taskSettings);
  });
  /**
   * Get Firebase auth user by UID
   * @name cy.getAuthUser
   * @see https://github.com/prescottprue/cypress-firebase#cygetauthuser
   * @example
   * cy.getAuthUser()
   */
  Cypress.Commands.add(options?.commandNames?.getAuthUser || 'getAuthUser', uid => cy.task('getAuthUser', uid));
}