/// <reference types="cypress" />

describe('notepad settings', () => {
  beforeEach(() => {
    cy.signin();
    cy.visit('https://127.0.0.1:3000/settings/notepad');
    cy.intercept('/api/settings').as('getSettings');
    cy.wait('@getSettings');
  });

  afterEach(() => {
    cy.request('DELETE', '/api/settings');
  });

  it('should show disabled auto-save by default', () => {
    cy.get('[data-testid="auto-save"] input').should('not.be.checked');
  });

  it('should allow to switch auto-save back and forth', () => {
    cy.get('[data-testid="auto-save"] input').should('not.be.checked');
    cy.get('[data-testid="auto-save"]').click();
    cy.get('[data-testid="auto-save"] input').should('be.checked');
    cy.reload();
    cy.get('[data-testid="auto-save"] input').should('be.checked');
    cy.get('[data-testid="auto-save"]').click();
    cy.get('[data-testid="auto-save"] input').should('not.be.checked');
    cy.reload();
    cy.get('[data-testid="auto-save"] input').should('not.be.checked');
  });

  it('should be localized', () => {
    // en locale
    cy.contains('Auto Save').should('exist');
    cy.contains('Автосохранение').should('not.exist');

    // set ru locale
    cy.visit('https://127.0.0.1:3000/settings');
    cy.get('[data-testid="locale-ru"]').click();

    // ru locale
    cy.visit('https://127.0.0.1:3000/settings/notepad');
    cy.contains('Auto Save').should('not.exist');
    cy.contains('Автосохранение').should('exist');
  });
});
