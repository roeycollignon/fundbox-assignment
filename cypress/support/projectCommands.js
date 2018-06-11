Cypress.Commands.add("validateNumberOfTabs", () => {
    cy.get('.reponav a').then(tabs => {
        expect(tabs).to.have.length(4);
    });
});

Cypress.Commands.add("validateWatchButton", () => {
    cy.get('.pagehead-actions .select-menu-button').click();
    cy.get('.pagehead-actions .select-menu-button').should('have.attr', 'aria-expanded', 'true');
    cy.get('.pagehead-actions .octicon-x').click();
});

Cypress.Commands.add("validateReadmeFileOpened", () => {
    cy.get('.repository-content .readme').contains('readme');
});

Cypress.Commands.add("validateStarButton", () => {
    cy.get('.pagehead-actions .starred .social-count').then(count => {
        let beforeStarred = count.text();
        cy.get('.pagehead-actions .unstarred').submit();
        cy.get('.pagehead-actions .starred .social-count').then(countAfterClick => {
            let afterStarred = countAfterClick.text();
            expect(Number(afterStarred)).to.equal(Number(beforeStarred)+1);
        }).then(() => {
            cy.get('.pagehead-actions .unstarred').submit();
        });
    });
});