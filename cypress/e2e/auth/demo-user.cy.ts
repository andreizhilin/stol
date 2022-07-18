/// <reference types="cypress" />

describe('demo user', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit('https://127.0.0.1:3000/signin');
    cy.contains('Start Demo').should('exist');
    cy.get('[data-testid="demo-button"]').click();
  });

  it('should have access to the notepad page', () => {
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.get('.animate-pulse').should('exist');
    cy.get('.animate-pulse').should('not.exist');
    cy.get('[data-testid="notepad-widget"]').should('exist');
  });

  it('should be redirected from signin page to the homepage', () => {
    cy.visit('https://127.0.0.1:3000/signin');
    cy.url().should('eq', 'https://127.0.0.1:3000/');
  });

  it('should be able to sign out', () => {
    cy.visit('https://127.0.0.1:3000');
    cy.get('[data-testid="profile-button"]').should('exist').click();
    cy.get('[data-testid="logout-button"]').should('exist').click();
    cy.url().should('eq', 'https://127.0.0.1:3000/signin');
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.url().should('eq', 'https://127.0.0.1:3000/signin');
  });
});
