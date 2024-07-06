describe("template spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // ASSERT margin CSS property is not present
  // factoring browsers default agent styles, we expect a margin of 8px
  // assuming we haven't applied CSS reset
  it(`Verify margin CSS property is 8px, since no CSS reset`, () => {
    cy.get("body").should("have.css", "margin", "8px");
  });
});
