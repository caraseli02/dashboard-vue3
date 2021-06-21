// https://docs.cypress.io/api/introduction/api.html

describe("Login Test", () => {
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
    cy.get("#authBtn").click();
    cy.url().should("include", "/dashboard");
    cy.get("#btnLogout").click();
  });
  it("Show error on wrong password", () => {
    cy.visit("/");
    cy.url().should("include", "/auth");

    cy.get("#email")
      .should("have.value", "")
      .type("test@apimosa.es")
      .should("have.value", "test@apimosa.es");
    cy.get("#password").should("have.value", "").type("123457");
    cy.get("#authBtn").click();
  });
});
