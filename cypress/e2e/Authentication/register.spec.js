let routes, auth;

before(() => {
  cy.fixture('auth').then((content) => (auth = content));
  cy.fixture('routes').then((content) => (routes = content));
});

beforeEach(() => {
  cy.visit(routes.registerPage);
});

describe('Login Page Tests', () => {
  it('checks if fields are visible', () => {
    const { authSelectors } = auth;

    cy.get(authSelectors.NameRegisterInput)
      .should('be.visible')
      .and('have.value', '');

    cy.get(authSelectors.EmailRegisterInput)
      .should('be.visible')
      .and('have.value', '');

    cy.get(authSelectors.PasswordRegisterInput)
      .should('be.visible')
      .and('have.value', '');

    cy.get(authSelectors.ConfirmPasswordRegisterInput)
      .should('be.visible')
      .and('have.value', '');

    cy.get(authSelectors.TermsRegisterCheckbox).should('be.visible');

    cy.get(authSelectors.RegisterPasswordSubmitButton).should('be.visible');
  });

  it('checks for errors', () => {
    const { authSelectors } = auth;

    cy.get(authSelectors.RegisterPasswordSubmitButton)
      .should('be.visible')
      .click();
    cy.get('.invalid-feedback').should(
      'contain',
      'Please enter your First Name'
    );
    cy.get('.invalid-feedback').should(
      'contain',
      'Please enter your email address'
    );
    cy.get('.invalid-feedback').should('contain', 'Please enter your password');
    cy.get('.invalid-feedback').should(
      'contain',
      'Please confirm your password'
    );

    cy.get(authSelectors.NameRegisterInput).should('be.visible').type('l');
    cy.get(authSelectors.RegisterPasswordSubmitButton)
      .should('be.visible')
      .click();
    cy.get('.invalid-feedback').should(
      'contain',
      'Name is too short - should be 2 chars minimum'
    );

    cy.get(authSelectors.EmailRegisterInput).should('be.visible').type('loop');
    cy.get(authSelectors.RegisterPasswordSubmitButton)
      .should('be.visible')
      .click();
    cy.get('.invalid-feedback').should('contain', 'Invalid email address');

    cy.get(authSelectors.PasswordRegisterInput)
      .should('be.visible')
      .type('loop');
    cy.get(authSelectors.RegisterPasswordSubmitButton)
      .should('be.visible')
      .click();
    cy.get('.invalid-feedback').should(
      'contain',
      'Please use at least 12 characters'
    );

    cy.get(authSelectors.ConfirmPasswordRegisterInput)
      .should('be.visible')
      .type('loop');
    cy.get(authSelectors.RegisterPasswordSubmitButton)
      .should('be.visible')
      .click();
    cy.get('.invalid-feedback').should(
      'contain',
      'Please use at least 12 characters'
    );

    cy.get(authSelectors.PasswordRegisterInput)
      .should('be.visible')
      .type('123456789013');
    cy.get('.invalid-feedback').should(
      'contain',
      'Password must contain at least 12 characters, one uppercase, one number and one special character (i.e !,@,#,$,%,^,&,?,-)'
    );

    cy.get(authSelectors.PasswordRegisterInput)
      .should('be.visible')
      .type('A23#@fjk39534');
    cy.get(authSelectors.ConfirmPasswordRegisterInput)
      .should('be.visible')
      .type('A23#@fjk3953');
    cy.get('.invalid-feedback').should('contain', 'Passwords must match');
  });
});
