// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("Visits the app root url", () => {
    const { username, password } = ["test@test.com", "123456"];
    print(username, password);
    cy.visit("/");
    cy.url().should("include", "/auth");
  });
});
