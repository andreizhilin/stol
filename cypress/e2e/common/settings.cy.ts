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
    cy.visit('https://127.0.0.1:3000/settings');
    cy.get('[data-test="locale-en"]').should('be.disabled');
    cy.get('[data-test="locale-ru"]').should('not.be.disabled');
    cy.contains('Appearance & Language').should('exist');
    cy.contains('Notepad').should('exist');
    cy.contains('Внешний вид и язык').should('not.exist');
    cy.contains('Блокнот').should('not.exist');
  });

  it('should allow to switch locale back and forth', () => {
    cy.visit('https://127.0.0.1:3000/settings');
    cy.get('[data-test="locale-en"]').should('be.disabled');
    cy.get('[data-test="locale-ru"]').should('not.be.disabled');
    cy.contains('Appearance & Language').should('exist');
    cy.contains('Notepad').should('exist');
    cy.contains('Внешний вид и язык').should('not.exist');
    cy.contains('Блокнот').should('not.exist');

    cy.get('[data-test="locale-ru"]').click();
    cy.get('[data-test="locale-en"]').should('not.be.disabled');
    cy.get('[data-test="locale-ru"]').should('be.disabled');
    cy.contains('Appearance & Language').should('not.exist');
    cy.contains('Notepad').should('not.exist');
    cy.contains('Внешний вид и язык').should('exist');
    cy.contains('Блокнот').should('exist');

    cy.reload();
    cy.get('[data-test="locale-en"]').should('not.be.disabled');
    cy.get('[data-test="locale-ru"]').should('be.disabled');
    cy.contains('Appearance & Language').should('not.exist');
    cy.contains('Notepad').should('not.exist');
    cy.contains('Внешний вид и язык').should('exist');
    cy.contains('Блокнот').should('exist');

    cy.get('[data-test="locale-en"]').click();
    cy.get('[data-test="locale-en"]').should('be.disabled');
    cy.get('[data-test="locale-ru"]').should('not.be.disabled');
    cy.contains('Appearance & Language').should('exist');
    cy.contains('Notepad').should('exist');
    cy.contains('Внешний вид и язык').should('not.exist');
    cy.contains('Блокнот').should('not.exist');

    cy.reload();
    cy.get('[data-test="locale-en"]').should('be.disabled');
    cy.get('[data-test="locale-ru"]').should('not.be.disabled');
    cy.contains('Appearance & Language').should('exist');
    cy.contains('Notepad').should('exist');
    cy.contains('Внешний вид и язык').should('not.exist');
    cy.contains('Блокнот').should('not.exist');
  });

  it('should show disabled dark mode by default', () => {
    cy.visit('https://127.0.0.1:3000/settings');
    cy.get('[data-test="isDarkMode"] input').should('not.be.checked');
    cy.get('.dark').should('not.exist');
  });

  it('should allow to switch dark mode back and forth', () => {
    cy.visit('https://127.0.0.1:3000/settings');
    cy.get('[data-test="isDarkMode"] input').should('not.be.checked');
    cy.get('[data-test="isDarkMode"] label').click();
    cy.get('[data-test="isDarkMode"] input').should('be.checked');
    cy.get('.dark').should('exist');
    cy.reload();
    cy.get('[data-test="isDarkMode"] input').should('be.checked');
    cy.get('.dark').should('exist');
    cy.get('[data-test="isDarkMode"] label').click();
    cy.get('[data-test="isDarkMode"] input').should('not.be.checked');
    cy.get('.dark').should('not.exist');
    cy.reload();
    cy.get('[data-test="isDarkMode"] input').should('not.be.checked');
    cy.get('.dark').should('not.exist');
  });

  it('should be localized', () => {
    // en locale
    cy.visit('https://127.0.0.1:3000/settings');
    cy.contains('Dark Mode').should('exist');
    cy.contains('Тёмная тема').should('not.exist');

    // set ru locale
    cy.visit('https://127.0.0.1:3000/settings');
    cy.get('[data-test="locale-ru"]').click();

    // ru locale
    cy.visit('https://127.0.0.1:3000/settings');
    cy.contains('Dark Mode').should('not.exist');
    cy.contains('Тёмная тема').should('exist');
  });

  it('should support dark mode', () => {
    // white theme
    cy.visit('https://127.0.0.1:3000/settings');
    cy.get('[data-test="isDarkMode"]').should('have.css', 'color', 'rgb(0, 0, 0)');
    cy.visit('https://127.0.0.1:3000/settings');
    cy.get('[data-test="locale-ru"]').should('have.css', 'color', 'rgb(0, 0, 0)');
    cy.get('[data-test="locale-en"]').should('have.css', 'color', 'rgb(0, 0, 0)');

    // set dark theme
    cy.visit('https://127.0.0.1:3000/settings');
    cy.get('[data-test="isDarkMode"] label').click();

    // dark theme
    cy.get('[data-test="isDarkMode"]').should('have.css', 'color', 'rgb(255, 255, 255)');
    cy.visit('https://127.0.0.1:3000/settings');
    cy.get('[data-test="locale-ru"]').should('have.css', 'color', 'rgb(255, 255, 255)');
    cy.get('[data-test="locale-en"]').should('have.css', 'color', 'rgb(255, 255, 255)');
  });
});
