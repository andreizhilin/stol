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
    cy.get('[data-test="isAutoSaveEnabled"] input').should('be.checked');
    cy.reload();
    cy.get('[data-test="isAutoSaveEnabled"] input').should('be.checked');
    cy.get('[data-test="isAutoSaveEnabled"] label').click();
    cy.get('[data-test="isAutoSaveEnabled"] input').should('not.be.checked');
    cy.reload();
    cy.get('[data-test="isAutoSaveEnabled"] input').should('not.be.checked');
  });

  it('should be localized', () => {
    // en locale
    cy.contains('Auto Save').should('exist');
    cy.contains('Автосохранение').should('not.exist');

    // set ru locale
    cy.visit('https://127.0.0.1:3000/settings/localization');
    cy.get('[data-test="locale-ru"]').click();

    // ru locale
    cy.visit('https://127.0.0.1:3000/settings/notepad');
    cy.contains('Auto Save').should('not.exist');
    cy.contains('Автосохранение').should('exist');
  });
});
