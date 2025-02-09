/**
 * Load config for Cypress from environment variables. Loads
 * FIREBASE_AUTH_EMULATOR_HOST, FIRESTORE_EMULATOR_HOST,
 * FIREBASE_DATABASE_EMULATOR_HOST, and GCLOUD_PROJECT variable
 * values from environment to pass to Cypress environment
 * @param cypressConfig - Existing Cypress config
 * @returns Cypress config extended with environment variables
 */
export default function extendWithFirebaseConfig(cypressConfig) {
  const valuesFromEnv = ['FIREBASE_AUTH_EMULATOR_HOST', 'FIREBASE_DATABASE_EMULATOR_HOST', 'FIRESTORE_EMULATOR_HOST', 'GCLOUD_PROJECT'].reduce((acc, varKey) => process.env[varKey] ? {
    ...acc,
    [varKey]: process.env[varKey]
  } : acc, {});
  // Return merge with original config (so it is not runover)
  return {
    ...cypressConfig,
    env: {
      ...valuesFromEnv,
      ...cypressConfig?.env
    }
  };
}