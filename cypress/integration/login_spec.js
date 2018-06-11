const credentials = {
    email: 'roeycollignon+cypressTest@gmail.com',
    password: 'AaBb1234'
};

const HOME_PAGE_URL = 'https://github.com/';

describe('Login', function () {
    beforeEach(() => {
        cy.login(credentials.email, credentials.password);
    });

    it('should login successfully', () => {
        cy.url().should('eq', HOME_PAGE_URL)
    })
});