/// <reference types="cypress" />

describe('notepad settings', () => {
  beforeEach(() => {
    cy.signin();
    cy.visit('https://127.0.0.1:3000/settings/notepad');
    cy.intercept('/api/settings').as('getSettings');
    cy.wait('@getSettings');
    cy.get('[data-test="isAutoSaveEnabled"]').as('isAutoSaveEnabled');
  });

  afterEach(() => {
    cy.request('DELETE', '/api/settings');
  });

  it('should show disabled auto-save by default', () => {
    cy.get('[data-test="isAutoSaveEnabled"] input').should('not.be.checked');
  });

  it('should allow to switch auto-save back and forth', () => {
    cy.get('[data-test="isAutoSaveEnabled"] input').should('not.be.checked');
    cy.get('[data-test="isAutoSaveEnabled"] label').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('[data-test="isAutoSaveEnabled"] input').should('be.checked');
    cy.reload();
    cy.get('[data-test="isAutoSaveEnabled"] input').should('be.checked');
    cy.get('[data-test="isAutoSaveEnabled"] label').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('[data-test="isAutoSaveEnabled"] input').should('not.be.checked');
    cy.reload();
    cy.get('[data-test="isAutoSaveEnabled"] input').should('not.be.checked');
  });
});
