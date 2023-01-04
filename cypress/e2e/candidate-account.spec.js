import firebase from 'firebase';

let routes, account, auth;

before(() => {
  cy.fixture('account').then((content) => (account = content));
  cy.fixture('routes').then((content) => (routes = content));
  cy.fixture('auth').then((content) => (auth = content));

  const { authSelectors } = auth;

  cy.visit(routes.candidateAccountPage);

  cy.stub(firebase.auth(), 'signInWithEmailAndPassword').returns(
    Promise.resolve()
  );

  cy.get(authSelectors.EmailLoginInput).type(Cypress.env('USER_EMAIL'));

  cy.get(authSelectors.PasswordLoginInput).type(Cypress.env('USER_PASSWORD'));

  cy.get(authSelectors.LoginPasswordSubmitButton).click();
});

beforeEach(() => {
  cy.visit(routes.loginPage);
});

describe('Candidate Accuont Page Tests', () => {
  it.only('checks if fields are visible', () => {
    const { accountSelectors } = account;

    cy.get(accountSelectors.FirstNameAccountInput)
      .should('be.visible')
      .and('have.value', '');
  });
});
