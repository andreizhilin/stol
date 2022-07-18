/// <reference types="cypress" />
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

describe('clock', () => {
  beforeEach(() => {
    cy.signin();
    cy.visit('https://127.0.0.1:3000');
  });

  it('should show current date and time on desktop', () => {
    cy.contains(dayjs().add(3, 'seconds').format('HH:mm:ss'))
      .should('be.visible')
      .should('have.attr', 'title', dayjs().format('DD.MM.YYYY'));
  });

  it('should NOT show current date and time on tablet', () => {
    cy.viewport(760, 600);
    cy.contains(dayjs().add(3, 'seconds').format('HH:mm:ss')).should('not.be.visible');
  });
});
