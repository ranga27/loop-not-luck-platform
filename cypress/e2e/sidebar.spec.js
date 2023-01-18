/* eslint-disable one-var */
/* eslint-disable no-return-assign */
/* eslint-disable cypress/no-unnecessary-waiting */
let routes, auth, sidebar;

before(() => {
  cy.fixture('sidebar').then((content) => (sidebar = content));
  cy.fixture('auth').then((content) => (auth = content));
  cy.fixture('routes').then((content) => (routes = content));
});

beforeEach(() => {
  cy.visit(routes.logout);
  cy.reload();
  cy.wait(5000);

  cy.visit(routes.loginPage);
});

describe('My Loop Page Tests', () => {
  it('checks if buttons are visible', () => {
    const { authSelectors } = auth;
    const { sideBarSelectors } = sidebar;

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
    cy.get(sideBarSelectors.LoopLogo).should('be.visible');
    cy.get(sideBarSelectors.FullName).should('be.visible');
    cy.get(sideBarSelectors.MyLoop).should('be.visible').click();
    cy.url().should('eq', routes.loop);
    cy.get(sideBarSelectors.Applications).should('be.visible').click();
    cy.url().should('eq', routes.applications);
    cy.get(sideBarSelectors.SavedRoles).should('be.visible').click();
    cy.url().should('eq', routes.saved);
    cy.get(sideBarSelectors.Messages).should('be.visible').click();
    cy.url().should('eq', routes.messages);
    cy.get(sideBarSelectors.Profile).should('be.visible').click();
    cy.url().should('eq', routes.profile);
    cy.get(sideBarSelectors.Help).should('be.visible').click();
    cy.url().should('eq', routes.help);
    cy.get(sideBarSelectors.Logout).should('be.visible').click();
  });
});
