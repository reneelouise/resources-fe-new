describe("My First Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("Checks that the header displays", () => {
    cy.get("header");
    cy.get(".NavLinks").should("have.length", 1);
    cy.get(".NavLinks button").should("have.text", "Resources");
  });
  it("Checks that the navlink displays with 1 item", () => {
    cy.get(".NavLinks").should("have.length", 1);
  });
});
