/// <reference types="cypress" />

describe('html', () => {
  beforeEach(() => {
    cy.visit('https://127.0.0.1:3000');
  });

  it('favicon should exist', () => {
    cy.document()
      .its('head')
      .find('link[rel="icon"][sizes="32x32"]')
      .should('have.attr', 'href')
      .should('eq', '/favicon-32x32.png');
    cy.document()
      .its('head')
      .find('link[rel="icon"][sizes="32x32"]')
      .should('have.attr', 'href')
      .should('eq', '/favicon-32x32.png');
    cy.document()
      .its('head')
      .find('link[rel="icon"][sizes="16x16"]')
      .should('have.attr', 'href')
      .should('eq', '/favicon-16x16.png');
    cy.document()
      .its('head')
      .find('link[rel="manifest"]')
      .should('have.attr', 'href')
      .should('eq', '/site.webmanifest');
    cy.document()
      .its('head')
      .find('link[rel="mask-icon"]')
      .should('have.attr', 'href')
      .should('eq', '/safari-pinned-tab.svg');
  });

  it('title should exist', () => {
    cy.title().should('eq', 'Stol - useful desktop');
  });

  it('title should be localized', () => {
    cy.signin();
    cy.visit('https://127.0.0.1:3000');
    // en locale
    cy.title().should('eq', 'Stol - useful desktop');

    // set ru locale
    cy.visit('https://127.0.0.1:3000/settings');
    cy.get('[data-testid="locale-ru"]').click();

    // ru locale
    cy.title().should('eq', 'Полезный рабочий "Стол"');
  });
});
