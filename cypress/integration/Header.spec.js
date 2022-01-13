describe("Testing the heeader", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("Checks that the header displays", () => {
    cy.get("header");
    cy.get(".NavLinks").should("have.length", 1);
    cy.get(".NavLinks button").should("have.text", "Resources");
    cy.get(".Login-Button").click();
    cy.get(".Login-Form");
    cy.get(".User-Dropdown-Menu").click();
    // cy.get("select");
    // cy.get(".User-Dropdown-Menu ul").should("have.length", 22);
  });
});
