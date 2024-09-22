describe("Verify Fonts Primary/Secondary are applied as expected", () => {
    beforeEach(() => {
        // WHEN the App is rendered inside a browser
        cy.visit("/");
    });

    // GIVEN the expected Font Family names
    const EXPECTED_PRIMARY_FONT = "Roboto, sans-serif";
    const EXPECTED_SECONDARY_FONT = '"Courier New", Courier, monospace';
    const EXPECTED_ALTERNATIVE_FONT = "Arial";
    // const EXPECTED_ALTERNATIVE_FONT = "Roboto Mono, monospace";

    // THEN all Text in Introduction Section should have the Secondary Font
    it(`Verify Introduction Section has Secondary Font: ${EXPECTED_SECONDARY_FONT}`, () => {
        cy.get('#introduction-section').should('have.css', 'font-family', EXPECTED_SECONDARY_FONT);
    });

    // THEN Navigation Bar Text should have the Primary Font
    it(`Verify Navigation Bar has Primary Font: ${EXPECTED_PRIMARY_FONT}`, () => {
        cy.get('nav').should('have.css', 'font-family', EXPECTED_PRIMARY_FONT);
    });

    // THEN the text of the Professional Section Title Header should have the Primary Font
    it(`Verify Professional Section Header Title has Primary Font: ${EXPECTED_PRIMARY_FONT}`, () => {
        cy.get('#professional-section h1').should('have.css', 'font-family', EXPECTED_PRIMARY_FONT);
    });

    // THEN the text all Experience Items should have the Primary Font
    it(`Verify all text in Experience Items has Primary Font: ${EXPECTED_PRIMARY_FONT}`, () => {
        // for all divs inside the Professional Section, get the inner div
        // for each inner div, iterate over all elements and
        // assert that css font-family of each element inside the div has the expected Primary Font
        cy.get('#professional-section').each((div) => {
            cy.wrap(div).find('div div').find('*').each((element) => {
                cy.wrap(element).should('have.css', 'font-family', EXPECTED_PRIMARY_FONT);
            });
        });
    });

    // THEN the text of the Personal Information Section should have the Primary Font
    it(`Verify Personal Information text has Primary Font: ${EXPECTED_PRIMARY_FONT}`, () => {
        // Select the element containing "Name:" and then find its sibling
        cy.contains('span', 'Name:')
            .siblings('span')
            .should('contain.text', 'Konstantinos Lampridis').should('have.css', 'font-family', EXPECTED_PRIMARY_FONT);

        // Select the element containing "Email:" and then find its sibling
        cy.contains('span', 'Email:')
            .siblings('span')
            .should('contain.text', 'k.lampridis@hotmail.com').should('have.css', 'font-family', EXPECTED_PRIMARY_FONT);

        // Select the element containing "Github:" and then find its sibling link
        cy.contains('span', 'Github:')
            .siblings('span')
            .find('a')
            .should('have.attr', 'href', 'https://github.com/boromir674').should('have.css', 'font-family', EXPECTED_PRIMARY_FONT);

        // Select the element containing "Gitlab:" and then find its sibling link
        cy.contains('span', 'Gitlab:')
            .siblings('span')
            .find('a')
            .should('have.attr', 'href', 'https://gitlab.com/boromir674').should('have.css', 'font-family', EXPECTED_PRIMARY_FONT);

        // Select the element containing "LinkedIn:" and then find its sibling link
        cy.contains('span', 'LinkedIn:')
            .siblings('span')
            .find('a')
            .should('have.attr', 'href', 'https://linkedin.com/in/konstantinos-lampridis/').should('have.css', 'font-family', EXPECTED_PRIMARY_FONT);
    });

    // THEN the text of Education Items should have the Primary Font
    it(`Verify Education Items text has Primary Font: ${EXPECTED_PRIMARY_FONT}`, () => {
        // Assert for MSc Education Title
        cy.contains('h3', 'MSc in Artificial Intelligence')
            .should('have.css', 'font-family', EXPECTED_PRIMARY_FONT);

        // Assert for BSc Education Title
        cy.contains('h3', 'BSc in Applied Informatics')
            .should('have.css', 'font-family', EXPECTED_PRIMARY_FONT);
        
        // TODO cover tests for the rest of Education Text, such as University, description, etc.
    });


    // THEN the text of Portfolio Section have the Primary Font
    it(`Verify Portfolio Section text has Primary Font: ${EXPECTED_PRIMARY_FONT}`, () => {

        // assert for Portfolio Section Title Header
        cy.get('#open-source-portfolio-section h1').should('have.css', 'font-family', EXPECTED_PRIMARY_FONT);

        // assert text font for 'Reset Layout' button
        cy.get('#open-source-portfolio-section button').should('have.css',  'font-family', EXPECTED_ALTERNATIVE_FONT);


        // assert for each Portfolio Item: find all <divs> with data-grid prop,assert that the text has the Primary Font
        cy.get('#open-source-portfolio-section').find('div[data-grid]').each((div) => {
            cy.wrap(div).should('have.css', 'font-family', EXPECTED_PRIMARY_FONT);
        });
        
    });
});
