/// <reference types="cypress" />

describe('unauthorized user', () => {
  beforeEach(() => {
    cy.clearCookies();
  });

  it('should be redirected to signin page from the home page', () => {
    cy.visit('https://127.0.0.1:3000');
    cy.url().should('eq', 'https://127.0.0.1:3000/signin');
  });

  it('should be redirected to signin page from the notepad page', () => {
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.get('[data-test="notepad-page"]').should('not.exist');
    cy.url().should('eq', 'https://127.0.0.1:3000/signin');
  });

  it('should be able to start demo session', () => {
    cy.visit('https://127.0.0.1:3000/signin');
    cy.get('[data-test="demo-button"]').click();
    cy.url().should('eq', 'https://127.0.0.1:3000/');
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.get('[data-test="notepad-page"]').should('exist');
    cy.reload();
    cy.get('[data-test="notepad-page"]').should('exist');
  });

  it('should be able to signin', () => {
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.get('[data-test="notepad-page"]').should('not.exist');
    cy.url().should('eq', 'https://127.0.0.1:3000/signin');
    cy.signin();
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.get('[data-test="notepad-page"]').should('exist');
    cy.reload();
    cy.get('[data-test="notepad-page"]').should('exist');
  });
});
