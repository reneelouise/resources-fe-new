describe("Testing the heeader", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/"); //localhost:3000 works
  });
  it("Checks that the header displays", () => {
    cy.get("header"); // a header element is present 
    cy.get(".links").should("have.length", 1); // one navlink is showing
    cy.get(".NavLinks button").should("have.text", "Resources"); // navling has the name resources 
    cy.get(".Login-Button").click(); //you can click the login button
    cy.get(".cancel-btn").click() //you can click the cancel button
    cy.get(".Login-Button").click(); //you can click the login button
    cy.get(".user-selected-login-btn").click(); //you can click the next login button even if a user is not selected?
    cy.get(".Login-Button").click(); //you can click the login button
    cy.get(".Login-Form"); //a login form is showing 
    cy.get(".User-Dropdown-Menu") //you can click the user dropdown menu
    cy.get(".User-Dropdown-Menu").click(); // a user dropdown menu is showing and can be clicked
    cy.get(".user-selected-login-btn") //another login button is showing 
    cy.get(".cancel-btn") //a cancel button is showing
    cy.get(".Users-In-Dropdown").should("have.length", 26) // there are 26 items in the dropdown menu
    cy.get(".Users-In-Dropdown").first().should("have.text", "Ada Lovelace"); //check that the first user in dropdown is Ada Lovelace
    cy.get(".Users-In-Dropdown").last().should("have.text", "Yann LeCun");  //check that the last user in dropdown is Yann LeCun
    cy.get(".Users-In-Dropdown").last().should("have.text", "Yann LeCun").click(); //check that the last user in dropdown is Yann LeCun and select him
    cy.get(".user-selected-login-btn").click(); //you can click the next login button when a user is selected from the dropdown
    cy.get(".logged-user-text-and-logout"); //you can see text that states a user is logged in
    cy.get(".links").should("have.length", 3); // three navlinks are showing
    cy.get('.logged-user-text-and-logout').children('.logout-btn') // a logout button can be seen on the page
    cy.get('.logged-user-text-and-logout').children('.logout-btn').click() //a logout button can be clicked
    cy.get(".links").should("have.length", 1); // one navlink is showing again when user is logged out
 
        
   
  

    

  });
 
});
