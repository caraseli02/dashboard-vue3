// https://docs.cypress.io/api/introduction/api.html

describe("Auth Test", () => {
  it("Make Login, on success will be redirect to dashboard and make Logout", () => {
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
});
