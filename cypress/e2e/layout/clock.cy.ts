/// <reference types="cypress" />
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

describe('clock', () => {
  beforeEach(() => {
    cy.signin();
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
  });

  afterEach(() => {
    cy.request('DELETE', '/api/settings');
  });

  it('should show current date and time on desktop', () => {
    cy.get('[data-test="clock"]')
      .contains(dayjs().add(3, 'seconds').format('HH:mm:ss'))
      .should('be.visible')
      .should('have.attr', 'title', dayjs().format('MMMM D, YYYY'));
  });

  it('should NOT show current date and time on tablet', () => {
    cy.viewport(760, 600);
    cy.get('[data-test="clock"]').contains(dayjs().add(3, 'seconds').format('HH:mm:ss')).should('not.be.visible');
  });

  it('should be localized', () => {
    // en locale
    cy.get('[data-test="clock"]')
      .contains(dayjs().add(3, 'seconds').format('HH:mm:ss'))
      .should('be.visible')
      .should('have.attr', 'title', dayjs().format('MMMM D, YYYY'));

    // set ru locale
    cy.visit('https://127.0.0.1:3000/settings/localization');
    cy.get('[data-test="locale-ru"]').click();

    // ru locale
    cy.visit('https://127.0.0.1:3000/');
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('[data-test="clock"] > div').should('have.attr', 'title', dayjs().locale('ru').format('D MMMM YYYY'));
  });

  it('should support dark mode', () => {
    // white theme
    cy.get('[data-test="clock"]').should('have.css', 'color', 'rgb(0, 0, 0)');

    // set dark theme
    cy.visit('https://127.0.0.1:3000/settings/appearance');
    cy.get('[data-test="isDarkMode"] label').click();

    // dark theme
    cy.get('[data-test="clock"]').should('have.css', 'color', 'rgb(255, 255, 255)');
  });
});
