/// <reference types="cypress" />

describe('unauthorized user', () => {
  beforeEach(() => {
    cy.clearCookies();
  });

  it('should be redirected to signin page from the home page', () => {
    cy.visit('https://127.0.0.1:3000');
    cy.get('[data-testid="header-skeleton"]').should('exist');
    cy.get('[data-testid="header-skeleton"]').should('not.exist');
    cy.url().should('eq', 'https://127.0.0.1:3000/signin');
  });

  it('should be redirected to signin page from the notepad page', () => {
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.get('[data-testid="header-skeleton"]').should('exist');
    cy.get('[data-testid="header-skeleton"]').should('not.exist');
    cy.get('[data-testid="notepad-widget"]').should('not.exist');
    cy.url().should('eq', 'https://127.0.0.1:3000/signin');
  });

  it('should be able to start demo session', () => {
    cy.visit('https://127.0.0.1:3000/signin');
    cy.get('[data-testid="demo-button"]').click();
    cy.url().should('eq', 'https://127.0.0.1:3000/');
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.get('[data-testid="header-skeleton"]').should('exist');
    cy.get('[data-testid="header-skeleton"]').should('not.exist');
    cy.get('[data-testid="notepad-widget"]').should('exist');
    cy.reload();
    cy.get('[data-testid="header-skeleton"]').should('exist');
    cy.get('[data-testid="header-skeleton"]').should('not.exist');
    cy.get('[data-testid="notepad-widget"]').should('exist');
  });

  it('should be able to signin', () => {
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.get('[data-testid="header-skeleton"]').should('exist');
    cy.get('[data-testid="header-skeleton"]').should('not.exist');
    cy.get('[data-testid="notepad-widget"]').should('not.exist');
    cy.url().should('eq', 'https://127.0.0.1:3000/signin');
    cy.signin();
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.get('[data-testid="header-skeleton"]').should('exist');
    cy.get('[data-testid="header-skeleton"]').should('not.exist');
    cy.get('[data-testid="notepad-widget"]').should('exist');
    cy.reload();
    cy.get('[data-testid="header-skeleton"]').should('exist');
    cy.get('[data-testid="header-skeleton"]').should('not.exist');
    cy.get('[data-testid="notepad-widget"]').should('exist');
  });
});
