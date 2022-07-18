/// <reference types="cypress" />

describe('demo user', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit('https://127.0.0.1:3000/signin');
    cy.get('[data-test="demo-button"]').click();
  });

  it('should have access to the notepad page', () => {
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('[data-test="notepad-widget"]').should('exist');
  });

  it('should be redirected from signin page to the homepage', () => {
    cy.visit('https://127.0.0.1:3000/signin');
    cy.url().should('eq', 'https://127.0.0.1:3000/');
  });

  it('should be able to sign out', () => {
    cy.visit('https://127.0.0.1:3000');
    cy.get('[data-test="signout-button"]').should('exist').click();
    cy.url().should('eq', 'https://127.0.0.1:3000/signin');
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.url().should('eq', 'https://127.0.0.1:3000/signin');
  });
});
