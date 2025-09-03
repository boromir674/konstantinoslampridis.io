describe("Verify Fonts Primary/Secondary are applied as expected", () => {
    beforeEach(() => {
        // WHEN the App is rendered inside a browser
        cy.visit("/");
    });

    

    // GIVEN the expected Font Family names (consistent no-quotes format)
    const EXPECTED_PRIMARY_FONT = "Roboto, sans-serif";
    const EXPECTED_PRIMARY_FONT_FAMILY = 'Roboto, system-ui, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif';

    const EXPECTED_SECONDARY_FONT = '"Courier New", Courier, monospace';


    // THEN all Text in Introduction Section should have the Secondary Font
    it(`Verify Introduction Section has Secondary Font: ${EXPECTED_SECONDARY_FONT}`, () => {
        cy.get('#introduction-section').should('have.css', 'font-family', EXPECTED_SECONDARY_FONT);
    });

    // THEN Navigation Bar Text should have the Primary Font
    it(`Verify Navigation Bar has Primary Font: ${EXPECTED_PRIMARY_FONT}`, () => {
        cy.get('nav').should('have.css', 'font-family', EXPECTED_PRIMARY_FONT);
    });

    // THEN the text of the Professional Section Title Header should have the Primary Font
    it(`Verify Professional Section Header Title has Primary Font: ${EXPECTED_PRIMARY_FONT_FAMILY}`, () => {
        cy.get('#professional-section h2').should('have.css', 'font-family', EXPECTED_PRIMARY_FONT_FAMILY);
    });

    // THEN the text of all Experience Items should have the Primary Font
    it(`Verify all text in Experience Items has Primary Font: ${EXPECTED_PRIMARY_FONT_FAMILY}`, () => {
        cy.viewport(1280, 1280); // Set viewport to a standard desktop resolution

        // For each experience item (div) in the Professional Section
        cy.get('#professional-section').each((div) => {
            // Get the single "inner div" of experience item
            cy.wrap(div).find('div div').then(($innerDiv) => {
                // Get all direct children elements of the inner div
                cy.wrap($innerDiv).children().then(($elements) => {
                    const elementCount = $elements.length;
                    
                    // For each element in inner_elements_array[:-1] (exclude last item)
                    for (let i = 0; i < elementCount - 1; i++) {
                        cy.wrap($elements.eq(i)).should('have.css', 'font-family', EXPECTED_PRIMARY_FONT_FAMILY);
                    }
                    
                    // Assert that inner_elements_array[-1] has "inherit" as font-family
                    if (elementCount > 0) {
                        cy.wrap($elements.eq(elementCount - 1)).should('have.css', 'font-family', EXPECTED_PRIMARY_FONT_FAMILY);
                    }
                });
            });
        });
    });

    // THEN the text of Education Items should have the Primary Font
    it(`Verify Education Items text has Primary Font: ${EXPECTED_PRIMARY_FONT_FAMILY}`, () => {
        // Assert for MSc Education Title
        cy.contains('h2', 'MSc in Artificial Intelligence')
            .should('have.css', 'font-family', EXPECTED_PRIMARY_FONT_FAMILY);

        // Assert for BSc Education Title
        cy.contains('h2', 'BSc in Applied Informatics')
            .should('have.css', 'font-family', EXPECTED_PRIMARY_FONT_FAMILY);
        
        // TODO cover tests for the rest of Education Text, such as University, description, etc.
    });


    // THEN the text of OPEN SOURCE Portfolio Section have the Primary Font
    it(`Verify Portfolio Section text has Primary Font: ${EXPECTED_PRIMARY_FONT_FAMILY}`, () => {

        // assert PRIMARY FONT for Portfolio Section Title Header
        cy.get('#open-source-portfolio-section h2').should('have.css', 'font-family', EXPECTED_PRIMARY_FONT_FAMILY);

        // assert PRIMARY FONT for 'Reset Layout' button
        cy.get('#open-source-portfolio-section button').should('have.css', 'font-family', EXPECTED_PRIMARY_FONT);

        // assert for each Portfolio Item find div with data-grid prop and then assert for all spans, h3, h4 and buttons inside it
        const TYPOGRAPHY_SPANS_RECOGNIZED_TEXTS = ['Source Code', 'CI/CD', 'Documentation', 'Demo', 'Technologies'];
        cy.get('#open-source-portfolio-section').find('div[data-grid]').each((div) => {

            // Assert Title of Portfolio Project/Item has PRIMARY FONT
            cy.wrap(div).find('h3').should('have.css', 'font-family', EXPECTED_PRIMARY_FONT_FAMILY);

            // Assert Releases Pane Header Title and Links Header Title have PRIMARY FONT
            cy.wrap(div).find('h4').each((element) => {
                cy.wrap(element).should('have.css', 'font-family', EXPECTED_PRIMARY_FONT_FAMILY);
            });

            // Assert all items in the Resouce Links Pane have SECONDARY FONT
            cy.wrap(div).find('span').each((element) => {
                if (TYPOGRAPHY_SPANS_RECOGNIZED_TEXTS.includes(element.text())) {
                    cy.wrap(element).should('have.css', 'font-family', EXPECTED_PRIMARY_FONT_FAMILY);
                }
            });

            // Assert all items in the Releases Pane have SECONDARY FONT
            cy.wrap(div).find('button').each((element) => {
                cy.wrap(element).should('have.css', 'font-family', EXPECTED_PRIMARY_FONT_FAMILY);
            });

        });

    });
});
