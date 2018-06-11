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

Cypress.Commands.add("logout", () => {
    cy.get('.HeaderMenu #user-links .avatar ~ .dropdown-caret').click();
    cy.get('.logout-form .dropdown-signout').click();
});

Cypress.Commands.add("searchInSearchComponent", (projectName) => {
    cy.get('.header-search-input').type(projectName);
    cy.get('.js-site-search-form').submit();
});

Cypress.Commands.add("searchInResults", (projectName) => {
    searchInPage();

    function searchInPage() {
        let found = false;
        cy.get('.repo-list .repo-list-item').each(element => {
            element = element.find('> div a:first-child')[0];
            if (element.innerText === projectName) {
                element.click();
                found = true;
            }
        }).then(() => {
            if (!found) {
                if (cy.get('.application-main').find('.paginate-container') && cy.get('.pagination').find('a.next_page')) {
                    cy.get('a.next_page').click();
                    searchInPage();
                } else {
                    cy.log('no next page, search term not found');
                    cy.pause();
                }
            }
        })
    }
});

Cypress.Commands.add("validateProjectPage", () => {
    // Verify the number of tabs
    cy.get('.reponav a').then(tabs => {
        expect(tabs).to.have.length(4);
    });

    // Verify it has the readme file
    cy.get('.repository-content .readme').contains('readme');
})

