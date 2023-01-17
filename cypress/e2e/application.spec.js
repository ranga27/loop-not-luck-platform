/* eslint-disable one-var */
/* eslint-disable no-return-assign */
/* eslint-disable cypress/no-unnecessary-waiting */
let routes, auth, application;
before(() => {
  cy.fixture('application').then((content) => (application = content));
  cy.fixture('auth').then((content) => (auth = content));
  cy.fixture('routes').then((content) => (routes = content));
});

beforeEach(() => {
  cy.visit(routes.logout);
  cy.reload();
  cy.wait(5000);

  cy.visit(routes.loginPage);
});

describe('Application Page Test', () => {
  it('checks if buttons and Cards are visible', () => {
    const { authSelectors } = auth;
    const { applicationSelectors } = application;

    cy.get(authSelectors.EmailLoginInput)
      .should('be.visible')
      .type(Cypress.env('USER_EMAIL'));

    cy.get(authSelectors.PasswordLoginInput)
      .should('be.visible')
      .type(Cypress.env('USER_PASSWORD'));

    cy.get(authSelectors.LoginPasswordSubmitButton)
      .should('be.visible')
      .click();

    cy.wait(5000);

    cy.visit(routes.application);

    cy.get(applicationSelectors.ActionRequiredButton).should('be.visible');
    cy.get(applicationSelectors.AllApplicationButton).should('be.visible');
    cy.get(applicationSelectors.ApplicationCard).should('be.visible');

    cy.wait(3000);
    cy.visit(routes.logout);
  });
});
