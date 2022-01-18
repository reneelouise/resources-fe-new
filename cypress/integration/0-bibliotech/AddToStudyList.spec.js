describe("Add a resource to study list, then remove it", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/"); //localhost:3000 works
  });
  it("Logs a user in", () => {
    cy.get(".Login-Button").click(); //you can click the login button
    cy.get(".User-Dropdown-Menu").click(); // a user dropdown menu is showing and can be clicked
    cy.get(".Users-In-Dropdown")
      .first()
      .should("have.text", "Ada Lovelace")
      .click();
    cy.get(".user-selected-login-btn").click(); //you can click the next login button when a user is selected from the dropdown
    cy.get(".logged-user-text-and-logout"); //you can see text that states a user is logged in
    cy.get(".links").should("have.length", 3); // three navlinks are showing
    cy.get(".Resource-Card").first();
    cy.get(".add_to_study_list_button").first().click().wait(3000);
    cy.get(".remove_from_study_list_button").first().click().wait(3000);
    cy.get(".add_to_study_list_button").first();
    cy.get(".logged-user-text-and-logout").children(".logout-btn").click(); //a logout button can be clicked
    cy.get(".links").should("have.length", 1); // one navlink is showing again when user is logged out
  });
});
