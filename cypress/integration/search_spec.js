describe('Search', function () {
    beforeEach(() => {
        cy.login();
    });

    it('Search for cypress-io/cypress-cli that exists', () => {
        cy.searchInSearchComponent('cypress-io');
        cy.searchInResults('cypress-io/cypress-cli');
        cy.validateNumberOfTabs();
        cy.validateWatchButton();
        cy.validateReadmeFileOpened();
        cy.validateStarButton();
    });

    afterEach(() => {
        cy.logout();
    })
});