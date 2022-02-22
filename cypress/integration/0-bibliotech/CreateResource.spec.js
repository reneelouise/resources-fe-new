describe("Testing the CreateNewResource component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/new");
  });

  it("Checks that the CreateNewResource form displays", () => {
    cy.get(".create-new-resource");
    cy.get(".resource-name-input");
    cy.get(".resource-description-input");
    cy.get(".tag-chips")
      .should("have.length", 20)
      .should("have.css", "background-color")
      .and("eq", "rgb(25, 118, 210)");
    cy.get(".resource-type-selector");
    cy.get(".mark-stage-selector");
    cy.get(".recommendation-type-radio");
    cy.get(".recommendation-reason");
    cy.get(".submit-button");
  });

  it("Checks that the resource name input field displays what the user types", () => {
    cy.get(".resource-name-input").type("React 101").contains("React 101");
  });

  it("Checks that the resource name input field becomes red when it contains no input", () => {
    cy.get(".resource-name-input").type("hello").clear();
    cy.get(".resource-name-input-error");
  });

  it("Checks that the resource description input field displays what the user types", () => {
    cy.get(".resource-description-input")
      .type("React starter course for beginner level programmers")
      .contains("React starter course for beginner level programmers");
  });

  it("Checks that when I click a primary-coloured tag button it turns secondary-coloured and vice versa", () => {
    cy.get(".tag-chips")
      .first()
      .click()
      .should("have.css", "background-color")
      .and("eq", "rgb(123, 31, 162)");

    cy.get(".tag-chips")
      .first()
      .click()
      .should("have.css", "background-color")
      .and("eq", "rgb(21, 101, 192)");
  });

  it("Checks that the resource URL input field displays what the user types", () => {
    cy.get(".resource-url-input")
      .type("www.react.com")
      .contains("www.react.com");
  });

  it("Checks that the resource URL input field becomes red when it contains no input", () => {
    cy.get(".resource-url-input").type("hello").clear();
    cy.get(".resource-url-input-error");
  });

  it("Checks that the content type selector has 19 fields and when selection is entered it is displayed in the selector", () => {
    cy.get(".resource-type-selector").click();
    cy.get(".content-type-item").should("have.length", 19);
    cy.get(".content-type-item").last().click();
    cy.get(".resource-type-selector").contains("Other");
  });

  it("Checks that the mark stage selector has 8 fields and when selection is entered it is displayed in the selector", () => {
    cy.get(".mark-stage-selector").click();
    cy.get(".mark-stage-item").should("have.length", 8);
    cy.get(".mark-stage-item").last().click();
    cy.get(".mark-stage-selector").contains("Week 10+: Full stack projects");
  });

  it("Checks that the recommendation type has 3 radio buttons and the required labels", () => {
    cy.get(".recommendation-type-item").should("have.length", 3);
    cy.get(".recommendation-type-item").contains(
      "I recommend this resource after having used it"
    );
    cy.get(".recommendation-type-item").contains(
      "I do not recommend this resource, having used it"
    );
    cy.get(".recommendation-type-item").contains(
      `I haven't used this resource but it looks promising`
    );
  });

  it("Checks that the reason for recommendation input field displays what the user types", () => {
    cy.get(".recommendation-reason")
      .type("A really useful resource")
      .invoke("val", "A really useful resource")
      .should("have.value", "A really useful resource");
  });

  it("Checks that when a user clicks 'create resource' if all the required fields have inputs, a 'success' alert displays and all inputs clear", () => {
    cy.get(".Login-Button").click();
    cy.get(".User-Dropdown-Menu").click();
    cy.get(".Users-In-Dropdown").first().click();
    cy.get(".user-selected-login-btn").click();
    cy.get(".resource-name-input")
      .type("React Documentation")
      .invoke("val", "React Documentation");
    cy.get(".tag-chips").first().click();
    cy.get(".resource-url-input")
      .type(`https://reactjs.org/docs/getting-started.html${Math.random()}`)
      .invoke("val", "https://reactjs.org/docs/getting-started.html");
    cy.get(".resource-type-selector").click();
    cy.get(".content-type-item").eq(12).click();
    cy.get(".resource-type-selector").invoke("val", "Documentation");
    cy.get(".mark-stage-selector").click();
    cy.get(".mark-stage-item").eq(2).click();
    cy.get(".mark-stage-selector").invoke("val", "Week 3: React, HTML and CSS");
    cy.get(".recommendation-type-item").first().click();
    cy.get(".recommendation-type-radio").invoke(
      "val",
      "I recommend this resource after having used it"
    );
    cy.get(".submit-button").click();
    cy.get(".alert-submitted");
    cy.get(".resource-list-page");
  });

  it("Checks that when a user clicks 'create resource' if the URL for the resource already exists, an error alert is displayed", () => {
    cy.get(".Login-Button").click();
    cy.get(".User-Dropdown-Menu").click();
    cy.get(".Users-In-Dropdown").first().click();
    cy.get(".user-selected-login-btn").click();
    cy.get(".resource-name-input")
      .type("React Documentation")
      .invoke("val", "React Documentation");
    cy.get(".tag-chips").first().click();
    cy.get(".resource-url-input")
      .type("https://reactjs.org/docs/getting-started.html")
      .invoke("val", "https://reactjs.org/docs/getting-started.html");
    cy.get(".resource-type-selector").click();
    cy.get(".content-type-item").eq(12).click();
    cy.get(".resource-type-selector").invoke("val", "Documentation");
    cy.get(".mark-stage-selector").click();
    cy.get(".mark-stage-item").eq(2).click();
    cy.get(".mark-stage-selector").invoke("val", "Week 3: React, HTML and CSS");
    cy.get(".recommendation-type-item").first().click();
    cy.get(".recommendation-type-radio").invoke(
      "val",
      "I recommend this resource after having used it"
    );
    cy.get(".submit-button").click();
    cy.get(".alert-already-exists");
  });

  it("Checks that when a user clicks 'create resource' if not all the required fields have inputs, an error alert displays prompting to complete all required fields", () => {
    cy.get(".submit-button").click();
    cy.get(".resource-name-input-error");
    cy.get(".resource-url-input-error");
    cy.get(".resource-type-selector-error");
    cy.get(".mark-stage-selector-error");
    cy.get(".recommendation-type-error");
    cy.get(".alert-error");
  });
});
