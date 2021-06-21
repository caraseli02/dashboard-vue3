// https://docs.cypress.io/api/introduction/api.html

describe("Auth Test", () => {
  it("Register, redirect to dashboard and Logout", () => {
    cy.visit("/");
    cy.url().should("include", "/auth");

    cy.get("#authCreate").click();
    cy.get("#email")
      .should("have.value", "")
      .type("test@apimosa.es")
      .should("have.value", "test@apimosa.es");
    cy.get("#password")
      .should("have.value", "")
      .type("123456")
      .should("have.value", "123456");
    cy.get("#Contraseña2")
      .should("have.value", "")
      .type("123456")
      .should("have.value", "123456");
    cy.get("#Name")
      .should("have.value", "")
      .type("test")
      .should("have.value", "test");
    cy.get("#Surname")
      .should("have.value", "")
      .type("test")
      .should("have.value", "test");
    cy.get("#DNI")
      .should("have.value", "")
      .type("testdni")
      .should("have.value", "testdni");
    cy.get(".selectForm").should("have.value", null).select("Malaga");
    cy.get(".form-checkbox").check();
    cy.get("#authBtn").should("exist").click();
    cy.url().should("include", "/dashboard");
    cy.get("#btnLogout").click();
  });
});
