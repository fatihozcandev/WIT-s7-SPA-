describe("Olumlu Senaryolar", () => {
  describe("Home to Order", () => {
    it("Main Button", () => {
      cy.visit("http://localhost:5173/");
      cy.get('[data-cy="aciktim"]').click();
      cy.url().should("eq", "http://localhost:5173/siparis");
    });
  });
  describe("Order Page", () => {
    it("Form Runs", () => {
      cy.visit("http://localhost:5173/siparis");
      cy.get(".col-sm-3 > :nth-child(1) > .form-check-input").check();
      cy.get(".form-select").select("İnce");
      cy.get(".form-check > :nth-child(1) > .form-check-input").check();
      cy.get(".form-check > :nth-child(2) > .form-check-input").check();
      cy.get(".form-check > :nth-child(3) > .form-check-input").check();
      cy.get(".form-check > :nth-child(4) > .form-check-input").check();
    });
    it("Min 4 selection warning appears", () => {
      cy.visit("http://localhost:5173/siparis");
      cy.get(".form-check > :nth-child(1) > .form-check-input").check();
      cy.get(".form-check > :nth-child(2) > .form-check-input").check();
      cy.get(".form-check > :nth-child(3) > .form-check-input").check();
      cy.get(".form-check > .col > .form-text").should("be.visible");
    });
    it("Min 4 selection warning disappears", () => {
      cy.visit("http://localhost:5173/siparis");
      cy.get(".form-check > :nth-child(1) > .form-check-input").check();
      cy.get(".form-check > :nth-child(2) > .form-check-input").check();
      cy.get(".form-check > :nth-child(3) > .form-check-input").check();
      cy.get(".form-check > :nth-child(4) > .form-check-input").check();
      cy.get(".form-check > .col > .form-text").should("not.equal", "");
    });
    it("Min 3 character warning appears", () => {
      cy.visit("http://localhost:5173/siparis");
      cy.get(":nth-child(6) > .col-sm-10 > .form-control").type("AS");
      cy.get(":nth-child(6) > .col-sm-10 > .form-control").should("be.visible");
    });
    it("Min 3 character warning disappears", () => {
      cy.visit("http://localhost:5173/siparis");
      cy.get(":nth-child(6) > .col-sm-10 > .form-control").type(
        "Alttaki yazı kaybolacak"
      );
      cy.get(":nth-child(6) > .col-sm-10 > .form-control").should("not.eq", "");
    });
    it("Plus Button increases the quantity", () => {
      cy.visit("http://localhost:5173/siparis");
      cy.get('[name="plus"]').click();
      cy.get('[data-cy="toplam"] > .form-text').should(
        "contain",
        "Toplam: 170"
      );
    });
    it("Total Price is correctly calculated", () => {
      cy.visit("http://localhost:5173/siparis");
      cy.get(".form-check > :nth-child(1) > .form-check-input").check();
      cy.get(".form-check > :nth-child(2) > .form-check-input").check();
      cy.get(".form-check > :nth-child(3) > .form-check-input").check();
      cy.get(".form-check > :nth-child(4) > .form-check-input").check();
      cy.get('[name="plus"]').click();
      cy.get('[data-cy="toplam"] > .form-text').should(
        "contain",
        "Toplam: 190"
      );
    });
    it("Buton is active", () => {
      cy.visit("http://localhost:5173/siparis");
      cy.get(".form-select").select("İnce");
      cy.get(':nth-child(1) > [data-cy="boyut"]').click();
      cy.get(".form-check > :nth-child(1) > .form-check-input").check();
      cy.get(".form-check > :nth-child(2) > .form-check-input").check();
      cy.get(".form-check > :nth-child(3) > .form-check-input").check();
      cy.get(".form-check > :nth-child(4) > .form-check-input").check();
      cy.get(":nth-child(6) > .col-sm-10 > .form-control").type(
        "Alttaki yazı kaybolacak"
      );
      cy.get('[name="plus"]').click();
      cy.get('[data-cy="submit-btn"]').should("be.enabled");
    });
  });
  describe("Order to Success", () => {
    it("Buton is active", () => {
      cy.visit("http://localhost:5173/siparis");
      cy.get(".form-select").select("İnce");
      cy.get(':nth-child(1) > [data-cy="boyut"]').click();
      cy.get(".form-check > :nth-child(1) > .form-check-input").check();
      cy.get(".form-check > :nth-child(2) > .form-check-input").check();
      cy.get(".form-check > :nth-child(3) > .form-check-input").check();
      cy.get(".form-check > :nth-child(4) > .form-check-input").check();
      cy.get(":nth-child(6) > .col-sm-10 > .form-control").type(
        "Alttaki yazı kaybolacak"
      );
      cy.get('[name="plus"]').click();
      cy.get('[data-cy="submit-btn"]').click();
    });
  });
});
