/// <reference types="cypress" />
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

describe('clock', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should show current date and time on desktop', () => {
    cy.contains(dayjs().format('DD.MM.YYYY')).should('be.visible');
    cy.contains(dayjs().format('HH:mm:ss')).should('be.visible');
  });

  it('should NOT show current date and time on tablet', () => {
    cy.viewport(1000, 600);
    cy.contains(dayjs().format('DD.MM.YYYY')).should('not.be.visible');
    cy.contains(dayjs().format('HH:mm:ss')).should('not.be.visible');
  });
});