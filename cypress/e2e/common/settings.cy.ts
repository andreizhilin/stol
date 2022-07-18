/// <reference types="cypress" />

describe('common settings', () => {
  beforeEach(() => {
    cy.signin();
    cy.visit('https://127.0.0.1:3000/settings/');
    cy.intercept('/api/settings').as('getSettings');
    cy.wait('@getSettings');
  });

  afterEach(() => {
    cy.request('DELETE', '/api/settings');
  });

  it('should have EN locale by default', () => {
    cy.visit('https://127.0.0.1:3000/settings/localization');
    cy.get('[data-test="locale-en"]').should('be.disabled');
    cy.get('[data-test="locale-ru"]').should('not.be.disabled');
    cy.contains('Localization').should('exist');
    cy.contains('Notepad').should('exist');
    cy.contains('Язык').should('not.exist');
    cy.contains('Блокнот').should('not.exist');
  });

  it('should allow to switch locale back and forth', () => {
    cy.visit('https://127.0.0.1:3000/settings/localization');
    cy.get('[data-test="locale-en"]').should('be.disabled');
    cy.get('[data-test="locale-ru"]').should('not.be.disabled');
    cy.contains('Localization').should('exist');
    cy.contains('Notepad').should('exist');
    cy.contains('Язык').should('not.exist');
    cy.contains('Блокнот').should('not.exist');

    cy.get('[data-test="locale-ru"]').click();
    cy.get('[data-test="locale-en"]').should('not.be.disabled');
    cy.get('[data-test="locale-ru"]').should('be.disabled');
    cy.contains('Localization').should('not.exist');
    cy.contains('Notepad').should('not.exist');
    cy.contains('Язык').should('exist');
    cy.contains('Блокнот').should('exist');

    cy.reload();
    cy.get('[data-test="locale-en"]').should('not.be.disabled');
    cy.get('[data-test="locale-ru"]').should('be.disabled');
    cy.contains('Localization').should('not.exist');
    cy.contains('Notepad').should('not.exist');
    cy.contains('Язык').should('exist');
    cy.contains('Блокнот').should('exist');

    cy.get('[data-test="locale-en"]').click();
    cy.get('[data-test="locale-en"]').should('be.disabled');
    cy.get('[data-test="locale-ru"]').should('not.be.disabled');
    cy.contains('Localization').should('exist');
    cy.contains('Notepad').should('exist');
    cy.contains('Язык').should('not.exist');
    cy.contains('Блокнот').should('not.exist');

    cy.reload();
    cy.get('[data-test="locale-en"]').should('be.disabled');
    cy.get('[data-test="locale-ru"]').should('not.be.disabled');
    cy.contains('Localization').should('exist');
    cy.contains('Notepad').should('exist');
    cy.contains('Язык').should('not.exist');
    cy.contains('Блокнот').should('not.exist');
  });
});
