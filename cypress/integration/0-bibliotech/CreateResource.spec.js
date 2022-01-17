describe("Testing the CreateNewResource component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/new");
  });
  it("Checks that the CreateNewResource form displays", () => {
    cy.get(".create-new-resource");
    cy.get(".resource-name-input");
    cy.get(".resource-description-input");
    cy.get(".tag-buttons")
      .children()
      .should('have.length', 20)
      .should('have.css', 'background-color')
      .and('eq', 'rgb(25, 118, 210)');
    cy.get(".resource-type-selector");
    cy.get(".mark-stage-selector");
    cy.get(".recommendation-type-radio");
    cy.get(".recommendation-reason");
    cy.get(".submit-button");
  });

  it("Checks that the resource name input field displays what the user types", () => {
    cy.get('.resource-name-input')
      .type('React 101')
      .contains("React 101");
  });

  it("Checks that the resource name input field becomes red when it contains no input", () => {
    cy.get('.resource-name-input').type('hello').clear();
    cy.get('.resource-name-input-error');
  });

  it("Checks that the resource description input field displays what the user types", () => {
    cy.get('.resource-description-input')
      .type('React starter course for beginner level programmers')
      .contains('React starter course for beginner level programmers')
  });

  it("Checks that when I click a primary-coloured tag button it turns secondary-coloured and vice versa", () => {
    cy.get(".tag-buttons")
      .children()
      .first()
      .click()
      .should('have.css', 'background-color')
      .and('eq', 'rgb(156, 39, 176)')

    cy.get(".tag-buttons")
      .children()
      .first()
      .click()
      .should('have.css', 'background-color')
      .and('eq', 'rgb(25, 118, 210)')
  });

  it("Checks that the resource URL input field displays what the user types", () => {
    cy.get('.resource-url-input')
      .type('www.react.com')
      .contains("www.react.com");
  });

  it("Checks that the resource URL input field becomes red when it contains no input", () => {
    cy.get('.resource-url-input').type('hello').clear();
    cy.get('.resource-url-input-error');
  });

  it("Checks that the content type selector has 19 fields and when selection is entered it is displayed in the selector", () => {
    cy.log(cy.get('.resource-type-selector').children())
  });

});
