// https://docs.cypress.io/api/introduction/api.html

describe("Login Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url().should("include", "/auth");
  });
  it("Login, redirect to dashboard and Logout", () => {
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
  it("Show error on wrong password or email", () => {
    cy.get("#authBtn").click();
    cy.contains("Email no valido. Solo @apimosa se acceptan.");
    cy.contains("Mínimo 6 / Máximo 30");
    cy.get("#email")
      .should("have.value", "")
      .type("test@apimosa.ess")
      .should("have.value", "test@apimosa.ess");
    cy.get("#password").should("have.value", "").type("123457");
    cy.get("#authBtn").click();
    cy.contains("Solo se acceptan corros de @apimosa");
    cy.contains("Cerra").click();
    cy.get("#email").clear().type("test@apimosa.es");
    cy.get("#authBtn").click();
    cy.contains("Contraseña incorrecta");
    cy.contains("Cerra").click();
  });
  it("Check password recovery", () => {
    cy.contains(" ¿Has olvidado tu contraseña? ").click();
    cy.contains("Enviar").click();
    cy.contains("Please type in a valid email address.").click();
    cy.contains(" Cerrar ").click();
  });
});
