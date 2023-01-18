/* eslint-disable one-var */
/* eslint-disable no-return-assign */
/* eslint-disable cypress/no-unnecessary-waiting */
let routes, auth, faq;

before(() => {
  cy.fixture('faq').then((content) => (faq = content));
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
    const { FAQSelectors } = faq;

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
    cy.visit(routes.help);
    cy.url().should('eq', routes.help);
    cy.get(FAQSelectors.FAQHeader)
      .should('be.visible')
      .should('have.text', 'FAQs');
    cy.get(FAQSelectors.FAQContainer).should('be.visible');
    cy.get(FAQSelectors.FAQ1).should('be.visible');
    cy.get(FAQSelectors.FAQ2).should('be.visible');
    cy.get(FAQSelectors.FAQ3).should('be.visible');
    cy.get(FAQSelectors.FAQ4).should('be.visible');
    cy.get(FAQSelectors.FAQ5).should('be.visible');

    cy.visit(routes.logout);
  });
});
