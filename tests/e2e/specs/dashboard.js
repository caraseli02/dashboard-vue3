describe("Dashboard Test", () => {
  before(() => {
    cy.visit("/");
    cy.login();
    cy.url().should("include", "/dashboard");
  });

  it("Check monthselector funcionality", () => {
    cy.get("[data-cy=prevMonth]").should("be.visible");
    cy.get("[data-cy=actualMonth]").should("be.visible");
    cy.get("[data-cy=nextMonth]").should("be.visible");
  });
});
