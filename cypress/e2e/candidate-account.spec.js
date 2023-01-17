/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable no-return-assign */
/* eslint-disable import/no-unresolved */
// import firebase from 'firebase';

// auth
let routes;
let account;
let auth;

before(() => {
  cy.fixture('account').then((content) => (account = content));
  cy.fixture('routes').then((content) => (routes = content));
  cy.fixture('auth').then((content) => (auth = content));

  // const { authSelectors } = auth;
  // cy.visit(routes.candidateAccountPage);
  // cy.stub(firebase.auth(), 'signInWithEmailAndPassword').returns(
  //   Promise.resolve()
  // );
  // cy.get(authSelectors.EmailLoginInput).type(Cypress.env('USER_EMAIL'));
  // cy.get(authSelectors.PasswordLoginInput).type(Cypress.env('USER_PASSWORD'));
  // cy.get(authSelectors.LoginPasswordSubmitButton).click();
});

beforeEach(() => {
  cy.visit(routes.logout);
  cy.reload();
  cy.wait(5000);

  cy.visit(routes.loginPage);
});
describe('Candidate Account Page Tests', () => {
  it('checks if buttons are visible', () => {
    const { authSelectors } = auth;
    const { accountSelectors } = account;

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

    cy.visit(routes.candidateAccountPage);

    cy.url().should('eq', routes.profile);

    cy.get(accountSelectors.FirstNameAccountInput).should('be.visible');
    cy.get(accountSelectors.LastNameAccountInput).should('be.visible');
    cy.get(accountSelectors.MobileAccountInput).should('be.visible');
    cy.get('.react-select').should('be.visible');
    cy.get(accountSelectors.DegreeAccountInput).should('be.visible');
    // cy.get(accountSelectors.GraduationYearAccountInput).should('be.visible');
    // cy.get(accountSelectors.VisaRequiredAccountInput).should('be.visible');
    // cy.get(accountSelectors.JobValuesAccountInput).should('be.visible');
    // cy.get(accountSelectors.MoreJobValuesAccountInput).should('be.visible');
    // cy.get(accountSelectors.BehaviorAttributesAccountInput).should(
    //   'be.visible'
    // );
    // cy.get(accountSelectors.TechnicalSkillsAccountInput).should('be.visible');
    cy.get(accountSelectors.EmailAccountInput).should('be.visible');
    cy.get(accountSelectors.SubmitAccountButton).should('be.visible');

    cy.visit(routes.logout);
  });
});
