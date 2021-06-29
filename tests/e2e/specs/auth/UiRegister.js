// https://docs.cypress.io/api/introduction/api.html

describe("Register Test", () => {
  it("Register Validator", () => {
    cy.visit("/");
    cy.url().should("include", "/auth");
    cy.get("#authCreate").click();
    cy.get(".form-checkbox").check();
    cy.get("#authBtn").should("exist").click();
    cy.contains("Email no valido. Solo @apimosa se acceptan.");
    cy.contains("La contraseña debe tener mín 6 y máx 30 caracteres");
    cy.contains("Las contraseñas no coinciden");
    cy.contains("El nombre debe tener mín 3 y máx 30 caracteres");
    cy.contains("El apellido debe tener mín 3 y máx 30 caracteres");
    cy.contains("El DNI debe tener mín 6 y máx 12 caracteres");
    cy.contains("El DNI debe tener mín 6 y máx 12 caracteres");
    cy.contains("Elige centro de trabajo");
  });
  it.only("Register, redirect to dashboard and Logout", () => {
    cy.visit("/");
    cy.url().should("include", "/auth");
    cy.get("#authCreate").click();
    cy.get(".form-checkbox").check();
    cy.get("#authBtn").should("exist").click();
    cy.get("#email")
      .should("have.value", "")
      .type("vladwebapp@gmail.com")
      .should("have.value", "vladwebapp@gmail.com");
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
    cy.get("#authBtn").should("exist").click();
    cy.contains(
      "La dirección de correo especificada ya está siendo utilizada. Por favor, elige otra."
    );
    cy.contains("Cerra").click();
    cy.get("#email").clear().type("test@apimosa.es");
    cy.get("#authBtn").click();
    cy.url().should("include", "/dashboard");
    cy.get("#btnLogout").click();
  });
});
