/// <reference types="cypress" />

describe('html', () => {
  beforeEach(() => {
    cy.signin();
    cy.visit('https://127.0.0.1:3000');
    cy.waitSkeleton('[data-testid="header-skeleton"]');
  });

  after(() => {
    cy.request({ method: 'DELETE', url: '/api/settings', retryOnStatusCodeFailure: true });
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

  it('title should be localized', () => {
    cy.title().should('eq', 'Stol - useful desktop');

    cy.setLocale('ru');
    cy.title().should('eq', 'Полезный рабочий "Стол"');
  });
});
