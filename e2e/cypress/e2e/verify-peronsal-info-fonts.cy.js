describe("Verify Fonts Primary/Secondary are applied as expected", () => {

    beforeEach(() => {
        // WHEN the App is rendered inside a browser
        cy.visit("/");
    });

    // GIVEN the expected Font Family names
    const EXPECTED_PRIMARY_FONT = "Roboto, sans-serif";
    const EXPECTED_PRIMARY_FONT_FAMILY = 'Roboto, system-ui, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif';

    // THEN the text of the Personal Information Section should have the Primary Font
    it(`Verify Personal Information text has Primary Font: ${EXPECTED_PRIMARY_FONT_FAMILY}`, () => {
        // Verify the Name is rendered in <h1> html tag and has correct font
        cy.get('h1.css-b38fg1')  // Only selects if it's a header with that class
            // and the html element selected should be 1 <header> 
            .should('have.length', 1)
            .should('contain.text', 'Konstantinos Lampridis')
            .shouldHaveFontFamily(EXPECTED_PRIMARY_FONT_FAMILY);

        // Select the element containing "Email:" and then find its sibling
        cy.contains('span', 'Email')
            .siblings('span')
            .should('contain.text', 'k.lampridis@hotmail.com').should('have.css', 'font-family', EXPECTED_PRIMARY_FONT);

        // Verify the Gihub link is present and has correct font
        cy.get('[href="https://github.com/boromir674"]')
            // Verify that github.com link just exists
            .should('exist')
            .should('have.attr', 'href', 'https://github.com/boromir674')
            .shouldHaveFontFamily(EXPECTED_PRIMARY_FONT_FAMILY);

        // Select the element containing "LinkedIn:" and then find its sibling link
        cy.get('[href="https://linkedin.com/in/konstantinos-lampridis/"]')
            .should('exist')
            .should('have.attr', 'href', 'https://linkedin.com/in/konstantinos-lampridis/')
            .shouldHaveFontFamily(EXPECTED_PRIMARY_FONT_FAMILY);

        cy.get('[href="https://gitlab.com/boromir674"]')
            .should('exist')
            .should('have.attr', 'href', 'https://gitlab.com/boromir674')
            .shouldHaveFontFamily(EXPECTED_PRIMARY_FONT_FAMILY);
    });

});
