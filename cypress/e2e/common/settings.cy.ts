/// <reference types="cypress" />

describe('common settings', () => {
  beforeEach(() => {
    cy.signin();
    cy.visit('https://127.0.0.1:3000/settings/');
    cy.get('[data-testid="header-skeleton"]').should('exist');
    cy.get('[data-testid="header-skeleton"]').should('not.exist');
  });

  afterEach(() => {
    cy.request({ method: 'DELETE', url: '/api/settings', retryOnStatusCodeFailure: true });
  });

  it('should have EN locale by default', () => {
    cy.get('[data-testid="locale-en"]').should('be.disabled');
    cy.get('[data-testid="locale-ru"]').should('not.be.disabled');
    cy.contains('System').should('exist');
    cy.contains('Language').should('exist');
    cy.contains('Widgets').should('exist');
    cy.contains('Notepad').should('exist');
    cy.contains('Системные').should('not.exist');
    cy.contains('Язык').should('not.exist');
    cy.contains('Виджеты').should('not.exist');
    cy.contains('Блокнот').should('not.exist');
  });

  it('should allow to switch locale back and forth', () => {
    cy.get('[data-testid="locale-en"]').should('be.disabled');
    cy.get('[data-testid="locale-ru"]').should('not.be.disabled');
    cy.contains('System').should('exist');
    cy.contains('Language').should('exist');
    cy.contains('Widgets').should('exist');
    cy.contains('Notepad').should('exist');
    cy.contains('Системные').should('not.exist');
    cy.contains('Язык').should('not.exist');
    cy.contains('Виджеты').should('not.exist');
    cy.contains('Блокнот').should('not.exist');

    cy.get('[data-testid="locale-ru"]').click();
    cy.get('[data-testid="locale-en"]').should('not.be.disabled');
    cy.get('[data-testid="locale-ru"]').should('be.disabled');
    cy.contains('System').should('not.exist');
    cy.contains('Language').should('not.exist');
    cy.contains('Widgets').should('not.exist');
    cy.contains('Notepad').should('not.exist');
    cy.contains('Системные').should('exist');
    cy.contains('Язык').should('exist');
    cy.contains('Виджеты').should('exist');
    cy.contains('Блокнот').should('exist');

    cy.reload();
    cy.get('[data-testid="header-skeleton"]').should('exist');
    cy.get('[data-testid="header-skeleton"]').should('not.exist');
    cy.get('[data-testid="locale-en"]').should('not.be.disabled');
    cy.get('[data-testid="locale-ru"]').should('be.disabled');
    cy.contains('System').should('not.exist');
    cy.contains('Language').should('not.exist');
    cy.contains('Widgets').should('not.exist');
    cy.contains('Notepad').should('not.exist');
    cy.contains('Системные').should('exist');
    cy.contains('Язык').should('exist');
    cy.contains('Виджеты').should('exist');
    cy.contains('Блокнот').should('exist');

    cy.get('[data-testid="locale-en"]').click();
    cy.get('[data-testid="locale-en"]').should('be.disabled');
    cy.get('[data-testid="locale-ru"]').should('not.be.disabled');
    cy.contains('System').should('exist');
    cy.contains('Language').should('exist');
    cy.contains('Widgets').should('exist');
    cy.contains('Notepad').should('exist');
    cy.contains('Системные').should('not.exist');
    cy.contains('Язык').should('not.exist');
    cy.contains('Виджеты').should('not.exist');
    cy.contains('Блокнот').should('not.exist');

    cy.reload();
    cy.get('[data-testid="header-skeleton"]').should('exist');
    cy.get('[data-testid="header-skeleton"]').should('not.exist');
    cy.get('[data-testid="locale-en"]').should('be.disabled');
    cy.get('[data-testid="locale-ru"]').should('not.be.disabled');
    cy.contains('System').should('exist');
    cy.contains('Language').should('exist');
    cy.contains('Widgets').should('exist');
    cy.contains('Notepad').should('exist');
    cy.contains('Системные').should('not.exist');
    cy.contains('Язык').should('not.exist');
    cy.contains('Виджеты').should('not.exist');
    cy.contains('Блокнот').should('not.exist');
  });
});
