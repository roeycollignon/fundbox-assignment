// Use the search component
Cypress.Commands.add("searchInSearchComponent", (projectName) => {
    cy.get('.header-search-input').type(projectName);
    cy.get('.js-site-search-form').submit();
});

// After search, look for the required project
Cypress.Commands.add("searchInResults", (projectName) => {
    searchInPage();

    function searchInPage() {
        let found = false;

        // For each project in the reault, check if it's the required project, then click on it
        cy.get('.repo-list .repo-list-item').each(element => {
            element = element.find('> div a:first-child')[0];
            if (element.innerText === projectName) {
                element.click();
                found = true;
            }
        }).then(() => {
            // If it wasn't found, search in the next result page
            if (!found) {
                // TODO - handle end of results without finding the required page
                if (cy.get('.application-main').find('.paginate-container') && cy.get('.pagination').find('a.next_page')) {
                    cy.get('a.next_page').click();
                    searchInPage();
                } else {
                    cy.log('no next page, search term not found');
                }
            }
        });
    }
});