/// <reference types="cypress" />

describe('favicon', () => {
  beforeEach(() => {
    cy.visit('https://127.0.0.1:3000');
  });

  it('apple-touch-icon should exist', () => {
    cy.document()
      .its('head')
      .find('link[rel="apple-touch-icon"]')
      .should('have.attr', 'href')
      .should('eq', '/apple-touch-icon.png');
  });

  it('32x32 icon should exist', () => {
    cy.document()
      .its('head')
      .find('link[rel="icon"][sizes="32x32"]')
      .should('have.attr', 'href')
      .should('eq', '/favicon-32x32.png');
  });

  it('16x16 icon should exist', () => {
    cy.document()
      .its('head')
      .find('link[rel="icon"][sizes="16x16"]')
      .should('have.attr', 'href')
      .should('eq', '/favicon-16x16.png');
  });

  it('manifest should exist', () => {
    cy.document()
      .its('head')
      .find('link[rel="manifest"]')
      .should('have.attr', 'href')
      .should('eq', '/site.webmanifest');
  });

  it('mask-icon should exist', () => {
    cy.document()
      .its('head')
      .find('link[rel="mask-icon"]')
      .should('have.attr', 'href')
      .should('eq', '/safari-pinned-tab.svg');
  });
});
