/** Cypress Spec that tests all Portfolio Items have (css) margin-top and margin-bottom equal to 16px */

describe("Portfolio Section", () => {

    beforeEach(() => {
        cy.visit("/");
    });

    // TEST CASE 1: Verify CSS Properties of Portfolio Item Description
    it(`Verify CSS Properties of Portfolio Item Description`, () => {

        // for each direct div children of a <div> where class="react-grid-layout layout"
        // go one div inside-level and get the second child. it should be a <p> and have the CSS expected
        cy.get("div.react-grid-layout.layout > div").each($div => {
            cy.wrap($div).within(() => {
                const descriptionElement = cy.get("div").eq(0).children().eq(1);

                // expect Top and Bottom Margin from Browser Defaults !
                descriptionElement.should("have.css", "margin-top", "16px");
                descriptionElement.should("have.css", "margin-bottom", "16px");

                // expect other CSS properties to be untouched:
                // Browser Defaults do not have an opinion on these
                descriptionElement.should("have.css", "margin-left", "0px");
                descriptionElement.should("have.css", "margin-right", "0px");
                descriptionElement.should("have.css", "padding", "0px");

            });
        });

    });

    // TEST CASE 2: Verify Expected Number of Portfolio Items are rendered in Grid Layout
    const EXPECTED_NB_PORTFOLIO_ITEMS = 14;

    it(`Verify ${EXPECTED_NB_PORTFOLIO_ITEMS} Portfolio Items are rendered in Grid Layout`, () => {
        // count divs that are direct children of a <div> where class="react-grid-layout layout"
        // Option 1
        let counter = 0;
        cy.get("div.react-grid-layout.layout > div").each($div => {
            // if element does not have data-grid prop then log error, else update counter
            if (!$div.attr("data-grid")) {
                console.error("Portfolio Item does not have data-grid prop, which is required for Grid Layout!");
                console.log("Please fix production code.");
            } else {
                counter++;
            }
        }).then(() => {
            if (counter !== EXPECTED_NB_PORTFOLIO_ITEMS) {
                console.error(`Expected ${EXPECTED_NB_PORTFOLIO_ITEMS} Portfolio Items, but found ${counter}`);
                console.log(`If Items were added/removed, then we caught a regression (error): please fix production code.\n\nIf Items were added/removed intentionally, then update the test case Expected Number of Portfolio Items accordingly.`);
            }
        });
        // Option 2
        cy.get("div.react-grid-layout.layout > div").should("have.length", EXPECTED_NB_PORTFOLIO_ITEMS);

    });

});