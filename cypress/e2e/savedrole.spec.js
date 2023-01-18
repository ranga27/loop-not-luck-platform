/* eslint-disable one-var */
/* eslint-disable no-return-assign */
/* eslint-disable cypress/no-unnecessary-waiting */
let routes, auth, savedrole;
before(() => {
  cy.fixture('savedrole').then((content) => (savedrole = content));
  cy.fixture('auth').then((content) => (auth = content));
  cy.fixture('routes').then((content) => (routes = content));
});

beforeEach(() => {
  cy.visit(routes.logout);
  cy.reload();
  cy.wait(5000);

  cy.visit(routes.loginPage);
});

describe('Saved Role Page test', () => {
  it('Checks if button and cards are visible', () => {
    const { authSelectors } = auth;
    const { savedroleSelectors } = savedrole;

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

    cy.visit(routes.savedRole);

    cy.get(savedroleSelectors.SavedRoleCard).should('be.visible');
    cy.get(savedroleSelectors.SavedRoleApplyButton).should('be.visible');
    cy.get(savedroleSelectors.SavedRoleRemoveButton).should('be.visible');
    cy.get(savedroleSelectors.SavedRoleViewInformation).should('be.visible');

    cy.wait(3000);
    cy.visit(routes.logout);
  });
});
