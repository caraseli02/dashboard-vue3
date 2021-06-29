describe("Sidebar Test", () => {
  beforeEach(() => {
    cy.visit("/");
    // cy.get("body").then((body) => {
    //   if (body.find("#btnLogout").length > 0) {
    //     cy.get("#btnLogout").click();
    //   }
    // });
    cy.login();
    cy.url().should("include", "/dashboard");
  });

  it("Login, redirect to dashboard and Logout", () => {
    cy.url().should("include", "/dashboard");
    cy.get("[data-cy=sidebarBtn]").click();
    cy.get("[data-cy=name]").should("be.visible");
    cy.get("[data-cy=email]").should("be.visible");
    cy.contains(" Horario de Trabajo ");
    cy.contains(" Centro de Trabajo ");
    cy.contains("Aviso Legal");
    cy.contains("Política de cookies");
    cy.contains("Política de privacidad");
    cy.contains("Términos y condiciones");
    cy.get("[data-cy=workplaceSidebar]").its("length").should("be.gte", 1);
    if (
      cy.get("[data-cy=workplaceSidebar] > :nth-child(2)").should("be.visible")
    ) {
      cy.get("[data-cy=workplaceSidebar] > :nth-child(2)").click();
    }
    cy.get("[data-cy=sidebarLogout").click();
  });
});
