/* eslint-disable one-var */
/* eslint-disable no-return-assign */
/* eslint-disable cypress/no-unnecessary-waiting */
let routes, auth, loop;

before(() => {
  cy.fixture('loop').then((content) => (loop = content));
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
    const { loopSelectors } = loop;

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

    cy.visit(routes.loopPage);

    cy.url().should('eq', routes.loop);

    cy.get(loopSelectors.RefreshRolesButton).should('be.visible');
    cy.get(loopSelectors.LeftCarouselCard).should('be.visible');
    cy.get(loopSelectors.RightCarouselCard).should('be.visible');
    cy.get(loopSelectors.NotInterestingButton).should('be.visible');
    cy.get(loopSelectors.SalaryButton).should('be.visible');
    cy.get(loopSelectors.OtherButton).should('be.visible');
    cy.get(loopSelectors.MatchScore).should('be.visible');
    cy.get(loopSelectors.RecommendedRolesLink).should('be.visible');

    cy.visit(routes.logout);
  });
});
