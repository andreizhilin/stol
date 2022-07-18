/// <reference types="cypress" />
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

describe('notepad datepicker', () => {
  const today = dayjs().toDate();
  const tomorrow = dayjs().add(1, 'day').toDate();
  const note1 = `\`1234567890-=\\qwertyuiop[]asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+|QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>?`;
  const note2 = `ё1234567890-=\\йцукенгшщзхъфывапролджэячсмитьбю.Ё!"№;%:?*()_+/ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,`;

  beforeEach(() => {
    cy.signin();
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.intercept('/api/note?date=*').as('getNote');
    cy.wait('@getNote');
    cy.get('[data-testid="notepad-widget"]').as('notepadWidget');
  });

  afterEach(() => {
    cy.request('DELETE', '/api/notes');
    cy.request('DELETE', '/api/settings');
  });

  it('should clear unsaved note', () => {
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.get('[data-testid="notepad-widget"] .ce-block').last().click().type(`${note1}`);
    cy.contains(note1).should('exist');
    cy.get('[data-testid="save-button"]').should('not.be.disabled');

    cy.get('[data-testid="select-date"]').click();
    cy.get('[data-testid="calendar--container"] [data-selected="true"]').next().click();
    cy.get('.animate-pulse').should('exist');
    cy.get('.animate-pulse').should('not.exist');
    cy.contains(dayjs(tomorrow).format('MMMM D, YYYY'));
    cy.get('[data-testid="save-button"]').should('be.disabled');
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');

    cy.get('[data-testid="select-date"]').click();
    cy.get('[data-testid="calendar--container"] [data-selected="true"]').prev().click();
    cy.get('.animate-pulse').should('exist');
    cy.get('.animate-pulse').should('not.exist');
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    cy.get('[data-testid="save-button"]').should('be.disabled');
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');
  });

  it('should keep saved changes', () => {
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.get('[data-testid="notepad-widget"] .ce-block').last().click().type(`${note1}`);
    cy.contains(note1).should('exist');
    cy.get('[data-testid="save-button"]').should('not.be.disabled');

    cy.get('[data-testid="save-button"]:visible').click();
    // TODO: Proper wait for request
    cy.wait(1000);
    cy.get('[data-testid="save-button"]').contains('Save').should('exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');
    cy.contains(note1).should('exist');

    cy.get('[data-testid="select-date"]').click();
    cy.get('[data-testid="calendar--container"] [data-selected="true"]').next().click();
    cy.get('.animate-pulse').should('exist');
    cy.get('.animate-pulse').should('not.exist');
    cy.contains(dayjs(tomorrow).format('MMMM D, YYYY'));
    cy.get('[data-testid="save-button"]').should('be.disabled');
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');

    cy.get('[data-testid="select-date"]').click();
    cy.get('[data-testid="calendar--container"] [data-selected="true"]').prev().click();
    cy.get('.animate-pulse').should('exist');
    cy.get('.animate-pulse').should('not.exist');
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    cy.get('[data-testid="save-button"]').should('be.disabled');
    cy.contains(note1).should('exist');
    cy.contains(note2).should('not.exist');
  });

  it('should keep changes saved on non-default date', () => {
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.get('[data-testid="select-date"]').click();
    cy.get('[data-testid="calendar--container"] [data-selected="true"]').next().click();
    cy.get('.animate-pulse').should('exist');
    cy.get('.animate-pulse').should('not.exist');
    cy.contains(dayjs(tomorrow).format('MMMM D, YYYY'));
    cy.get('[data-testid="save-button"]').should('be.disabled');
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');

    cy.contains(dayjs(tomorrow).format('MMMM D, YYYY'));
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.get('[data-testid="notepad-widget"] .ce-block').last().click().type(`${note1}`);
    cy.contains(note1).should('exist');
    cy.get('[data-testid="save-button"]').should('not.be.disabled');

    cy.get('[data-testid="save-button"]:visible').click();
    // TODO: Proper wait for request
    cy.wait(1000);
    cy.get('[data-testid="save-button"]').contains('Save').should('exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');
    cy.contains(note1).should('exist');

    cy.get('[data-testid="select-date"]').click();
    cy.get('[data-testid="calendar--container"] [data-selected="true"]').prev().click();
    cy.get('.animate-pulse').should('exist');
    cy.get('.animate-pulse').should('not.exist');
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    cy.get('[data-testid="save-button"]').should('be.disabled');
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');

    cy.get('[data-testid="select-date"]').click();
    cy.get('[data-testid="calendar--container"] [data-selected="true"]').next().click();
    cy.get('.animate-pulse').should('exist');
    cy.get('.animate-pulse').should('not.exist');
    cy.contains(dayjs(tomorrow).format('MMMM D, YYYY'));
    cy.get('[data-testid="save-button"]').should('be.disabled');
    cy.contains(note1).should('exist');
    cy.contains(note2).should('not.exist');
  });

  it('should be localized', () => {
    // en locale
    cy.contains(dayjs(today).format('MMMM D, YYYY')).should('exist');
    cy.contains(dayjs(today).locale('ru').format('D MMMM YYYY')).should('not.exist');

    // set ru locale
    cy.visit('https://127.0.0.1:3000/settings');
    cy.get('[data-testid="locale-ru"]').click();

    // ru locale
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.get('.animate-pulse').should('exist');
    cy.get('.animate-pulse').should('not.exist');
    cy.contains(dayjs(today).format('MMMM D, YYYY')).should('not.exist');
    cy.contains(dayjs(today).locale('ru').format('D MMMM YYYY')).should('exist');
  });
});
