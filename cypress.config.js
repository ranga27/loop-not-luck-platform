/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const { defineConfig } = require('cypress');
// const cypressFirebasePlugin = require('cypress-firebase').plugin;
// const admin = require('firebase-admin');

module.exports = defineConfig({
  viewportWidth: 1300,
  viewportHeight: 1000,
  defaultCommandTimeout: 100000,
  requestTimeout: 100000,
  responseTimeout: 100000,
  pageLoadTimeout: 100000,
  video: false,
  codeCoverageTasksRegistered: true,
  env: {
    ENVIRONMENT: 'local',
    LOOP_URL: 'http://localhost:3000',
    USER_EMAIL: 'Abraham+14@loopnotluck.com',
    USER_PASSWORD: 'Abraham+14@loopnotluck.com',
    DOMAIN_NAME: 'localhost',
    secureCookie: false,
    TEST_UID: 'EKIWKAPuwnQ9PAPtQZS2hMh06Ft1',
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      require('@bahmutov/cypress-code-coverage/plugin')(on, config); // implement node event listeners here
      return config;
      // return cypressFirebasePlugin(on, config, admin);
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
