/* eslint-disable one-var */
/* eslint-disable no-return-assign */
/* eslint-disable cypress/no-unnecessary-waiting */
let routes, auth, help;
before(() => {
  cy.fixture('help').then((content) => (help = content));
  cy.fixture('auth').then((content) => (auth = content));
  cy.fixture('routes').then((content) => (routes = content));
});

beforeEach(() => {
  cy.visit(routes.logout);
  cy.reload();
  cy.wait(5000);

  cy.visit(routes.loginPage);
});

describe('Help Page test', () => {
  it('Checks all question card are working with answer', () => {
    const { authSelectors } = auth;
    const { helpSelectors } = help;

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

    cy.get(helpSelectors.HelpVisaQuestion).should('be.visible').click();
    cy.get(helpSelectors.HelpUnsuccessfulDoubt).should('be.visible').click();
    cy.get(helpSelectors.HelpReviewCv).should('be.visible').click();
    cy.get(helpSelectors.HelpInterviewResultWaiting)
      .should('be.visible')
      .click();
  });
});
