import extendWithFirebaseConfig from './extendWithFirebaseConfig';
import * as tasks from './tasks';
import { initializeFirebase } from './firebase-utils';
/**
 * Cypress plugin which attaches tasks used by custom commands
 * and returns modified Cypress config. Modified config includes
 * env setting with values of Firebase specific environment variables
 * such as GCLOUD_PROJECT, FIREBASE_DATABASE_EMULATOR_HOST,
 * FIRESTORE_EMULATOR_HOST and FIREBASE_AUTH_EMULATOR_HOST.
 * @param cypressOnFunc - on function from cypress plugins file
 * @param cypressConfig - Cypress config
 * @param adminInstance - firebase-admin instance
 * @param overrideConfig - Override config for firebase instance
 * @returns Extended Cypress config
 */
export default function pluginWithTasks(cypressOnFunc, cypressConfig, adminInstance, overrideConfig) {
  // Only initialize admin instance if it hasn't already been initialized
  if (adminInstance.apps?.length === 0) {
    initializeFirebase(adminInstance, overrideConfig);
  }
  const tasksWithFirebase = Object.keys(tasks).reduce((acc, taskName) => {
    acc[taskName] = taskSettings => {
      if (taskSettings?.uid) {
        return tasks[taskName](adminInstance, taskSettings.uid, taskSettings);
      }
      const {
        action,
        path: actionPath,
        options = {},
        data
      } = taskSettings;
      return tasks[taskName](adminInstance, action, actionPath, options, data);
    };
    return acc;
  }, {});
  // Attach tasks to Cypress using on function
  cypressOnFunc('task', tasksWithFirebase);
  // Return extended config
  return extendWithFirebaseConfig(cypressConfig);
}