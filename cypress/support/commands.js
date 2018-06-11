const HOME_PAGE_URL = 'https://github.com/';

const defaultCredentials = {
    email: 'roeycollignon+cypressTest@gmail.com',
    password: 'AaBb1234'
};

//selectors
const loginButton = 'a[href="/login"]';
const emailField = '#login_field';
const passwordField = '#password';
const submitButton = 'input[name="commit"]';

// Login flow
Cypress.Commands.add("login", (email, password) => {
    cy.clearCookies();
    cy.visit(HOME_PAGE_URL);
    cy.get(loginButton).click();

    cy.get(emailField)
        .type(email || defaultCredentials.email);

    cy.get(passwordField)
        .type(password || defaultCredentials.password);

    cy.get(submitButton).click();
});

// Logout flow
Cypress.Commands.add("logout", () => {
    cy.get('.HeaderMenu #user-links .avatar ~ .dropdown-caret').click();
    cy.get('.logout-form .dropdown-signout').click();
});

// TODO - login with HTTP request