// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("Login, redirect to dashboard and Logout", () => {
    cy.visit("/");
    cy.url().should("include", "/auth");

    cy.get("#email")
      .should("have.value", "")
      .type("test@apimosa.es")
      .should("have.value", "test@apimosa.es");
    cy.get("#password")
      .should("have.value", "")
      .type("123456")
      .should("have.value", "123456");
    cy.get("#enterBtn").click();
    cy.url().should("include", "/dashboard");
    cy.get("#btnLogout").click();
  });
});
