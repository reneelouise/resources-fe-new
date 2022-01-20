function login() {
    cy.get(".Login-Button").click(); //you can click the login button
    cy.get(".Login-Form"); //a login form is showing
    cy.get(".User-Dropdown-Menu") //you can see the user dropdown menu
    cy.get(".User-Dropdown-Menu").click(); // you can click the user dropdown menu
    cy.get(".Users-In-Dropdown").should("have.length", 26) // there are 26 items in the dropdown menu
    cy.get(".Users-In-Dropdown").first().should("have.text", "Ada Lovelace"); //check that the first user in dropdown is Ada Lovelace
    cy.get(".Users-In-Dropdown").last().should("have.text", "Yann LeCun");  //check that the last user in dropdown is Yann LeCun
    cy.get(".Users-In-Dropdown").last().should("have.text", "Yann LeCun").click(); //check that the last user in dropdown is Yann LeCun and select him
    cy.get(".user-selected-login-btn").click(); //you can click the next login button when a user is selected from the dropdown
  
  
  }
  
  
  describe("Testing the heeader", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/"); //localhost:3000 works
    });
 
  
    it("Checks that the login and cancel buttons can be clicked", () => {
      cy.get(".Login-Button").click(); //you can click the login button
      cy.get(".cancel-btn").click() //you can click the cancel button
  
    })
  
    it("Checks that user can login again see 26 users to choose from in the dropdown menu displayed in the correct order", () => {
      cy.get(".Login-Button").click(); //you can click the login button
      cy.get(".Login-Form"); //a login form is showing
      cy.get(".User-Dropdown-Menu") //you can see the user dropdown menu
      cy.get(".User-Dropdown-Menu").click(); // you can click the user dropdown menu
      cy.get(".Users-In-Dropdown").should("have.length", 26) // there are 26 items in the dropdown menu
      cy.get(".Users-In-Dropdown").first().should("have.text", "Ada Lovelace"); //check that the first user in dropdown is Ada Lovelace
      cy.get(".Users-In-Dropdown").last().should("have.text", "Yann LeCun");  //check that the last user in dropdown is Yann LeCun
    });
  
  
    it("Checks that user can be selected from the dropdown menu and can login", () => {
  
      //initial tests for user dropdown
  
      cy.get(".Login-Button").click(); //you can click the login button
      cy.get(".Login-Form"); //a login form is showing
      cy.get(".User-Dropdown-Menu") //you can see the user dropdown menu
      cy.get(".User-Dropdown-Menu").click(); // you can click the user dropdown menu
      cy.get(".Users-In-Dropdown").should("have.length", 26) // there are 26 items in the dropdown menu
      cy.get(".Users-In-Dropdown").first().should("have.text", "Ada Lovelace"); //check that the first user in dropdown is Ada Lovelace
      cy.get(".Users-In-Dropdown").last().should("have.text", "Yann LeCun");  //check that the last user in dropdown is Yann LeCun
  
      //latest tests for user login
  
      cy.get(".Users-In-Dropdown").last().should("have.text", "Yann LeCun").click(); //check that the last user in dropdown is Yann LeCun and select him
      cy.get(".user-selected-login-btn").click(); //you can click the next login button when a user is selected from the dropdown
  
    });
  
  
    it("Checks that three navlinks are showing when a user is logged in", () => {
  
      //initial tests for user dropdown
  
      login()
  
      //latest test checks that three navlinks are showing when a user is logged in
      cy.get(".links").should("have.length", 3); // three navlinks are showing
    });
  
  
  
    it("Checks that a user can logout and it shows the right number of navlinks and a login button", () => {
  
      //initial tests for user dropdown
  
      login()
  
      cy.get('.logout-btn').click()
      //latest test checks that user can
      cy.get(".links").should("have.length", 1); // three navlinks are showing
    });
  
  });
  
