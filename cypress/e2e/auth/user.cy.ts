/// <reference types="cypress" />

describe('user', () => {
  beforeEach(() => {
    cy.clearCookies();
  });

  it('should be redirected to signin page if not authorized', () => {
    cy.visit('https://127.0.0.1:3000');
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.url().should('eq', 'https://127.0.0.1:3000/signin');
  });

  it('should be able to start demo session', () => {
    cy.visit('https://127.0.0.1:3000/signin');
    cy.get('[data-testid="demo-button"]').click();
    cy.url().should('eq', 'https://127.0.0.1:3000/');

    cy.visit('https://127.0.0.1:3000/notepad');
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="notepad-page-skeleton"]');
    cy.get('[data-testid="notepad"]').should('exist');

    cy.reload();
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="notepad-page-skeleton"]');
    cy.get('[data-testid="notepad"]').should('exist');

    cy.get('[data-testid="profile-button"]').click();
    cy.get('[data-testid="logout-button"]').click();
    cy.url().should('eq', 'https://127.0.0.1:3000/signin');
  });

  it('should be able to signin and signout', () => {
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.get('[data-testid="notepad"]').should('not.exist');
    cy.url().should('eq', 'https://127.0.0.1:3000/signin');

    cy.signin();
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="notepad-page-skeleton"]');
    cy.get('[data-testid="notepad"]').should('exist');

    cy.reload();
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="notepad-page-skeleton"]');
    cy.get('[data-testid="notepad"]').should('exist');

    cy.get('[data-testid="profile-button"]').click();
    cy.get('[data-testid="logout-button"]').click();
    cy.url().should('eq', 'https://127.0.0.1:3000/signin');
  });
});
