/// <reference types="cypress" />
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

describe('notepad', () => {
  const today = dayjs().toDate();
  const tomorrow = dayjs().add(1, 'day').toDate();
  const note1 = `\`1234567890-=\\qwertyuiop[]asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+|QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>?`;
  const note2 = `ё1234567890-=\\йцукенгшщзхъфывапролджэячсмитьбю.Ё!"№;%:?*()_+/ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,`;

  beforeEach(() => {
    cy.signin();
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.intercept('/api/note?date=*').as('getNote');
    cy.wait('@getNote');
    cy.get('[data-test="notepad-page"]').as('notepadPage');
    cy.get('[data-test="prev-date-button"]').last().as('prevDateButton');
    cy.get('[data-test="next-date-button"]').last().as('nextDateButton');
  });

  afterEach(() => {
    cy.request('DELETE', '/api/notes');
  });

  it('should save empty note', () => {
    cy.get('@notepadPage').contains(dayjs(today).format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(note1).should('not.exist');
    cy.get('@notepadPage').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`q{backspace}`);
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('[data-test="notepad-save-button"]').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${note2}`);
    cy.get('@notepadPage').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`{ctrl+s}`);
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadPage').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.reload();
    cy.get('@notepadPage').contains(dayjs(today).format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(note1).should('not.exist');
    cy.get('@notepadPage').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
  });

  it('enter note -> save -> change date -> enter note -> save -> change date', () => {
    cy.contains(dayjs(today).format('D MMMM YYYY'));
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${note1}`);
    cy.contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('[data-test="notepad-save-button"]').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.contains(note1).should('exist');

    cy.get('@nextDateButton').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.contains(dayjs(tomorrow).format('D MMMM YYYY'));
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');

    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${note2}`);
    cy.contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`{ctrl+s}`);
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.contains(note2).should('exist');

    cy.get('@prevDateButton').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.contains(dayjs(today).format('D MMMM YYYY'));
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.contains(note1).should('exist');
    cy.contains(note2).should('not.exist');

    cy.reload();
    cy.get('@notepadPage').contains(dayjs(today).format('D MMMM YYYY'));
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.get('@notepadPage').contains(note1).should('exist');
    cy.get('@notepadPage').contains(note2).should('not.exist');

    cy.get('@nextDateButton').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadPage').contains(dayjs(tomorrow).format('D MMMM YYYY'));
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.get('@notepadPage').contains(note1).should('not.exist');
    cy.get('@notepadPage').contains(note2).should('exist');
  });

  it('enter note -> save -> change date -> enter note -> change date', () => {
    cy.contains(dayjs(today).format('D MMMM YYYY'));
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${note1}`);
    cy.contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('[data-test="notepad-save-button"]').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.contains(note1).should('exist');

    cy.get('@nextDateButton').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.contains(dayjs(tomorrow).format('D MMMM YYYY'));
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');

    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${note2}`);
    cy.contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('@prevDateButton').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.contains(dayjs(today).format('D MMMM YYYY'));
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.contains(note1).should('exist');
    cy.contains(note2).should('not.exist');

    cy.reload();
    cy.get('@notepadPage').contains(dayjs(today).format('D MMMM YYYY'));
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.get('@notepadPage').contains(note1).should('exist');
    cy.get('@notepadPage').contains(note2).should('not.exist');

    cy.get('@nextDateButton').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadPage').contains(dayjs(tomorrow).format('D MMMM YYYY'));
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.get('@notepadPage').contains(note1).should('not.exist');
    cy.get('@notepadPage').contains(note2).should('not.exist');
  });

  it('enter note -> save -> enter note -> save -> change date', () => {
    cy.get('@notepadPage').contains(dayjs(today).format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(note1).should('not.exist');
    cy.get('@notepadPage').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${note1}`);
    cy.get('@notepadPage').contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('[data-test="notepad-save-button"]').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadPage').contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${note2}`);
    cy.get('@notepadPage').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`{ctrl+s}`);
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadPage').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('@nextDateButton').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadPage').contains(dayjs(tomorrow).format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(note1).should('not.exist');
    cy.get('@notepadPage').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.reload();
    cy.get('@notepadPage').contains(dayjs(today).format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(note1).should('exist');
    cy.get('@notepadPage').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
  });

  it('enter note -> save -> enter note -> change date', () => {
    cy.get('@notepadPage').contains(dayjs(today).format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(note1).should('not.exist');
    cy.get('@notepadPage').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${note1}`);
    cy.get('@notepadPage').contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('[data-test="notepad-save-button"]').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadPage').contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${note2}`);
    cy.get('@notepadPage').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('@nextDateButton').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadPage').contains(dayjs(tomorrow).format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(note1).should('not.exist');
    cy.get('@notepadPage').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.reload();
    cy.get('@notepadPage').contains(dayjs(today).format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(note1).should('exist');
    cy.get('@notepadPage').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
  });

  it('enter note -> change date -> enter note -> save -> change date', () => {
    cy.get('@notepadPage').contains(dayjs(today).format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(note1).should('not.exist');
    cy.get('@notepadPage').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${note1}`);
    cy.get('@notepadPage').contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('@nextDateButton').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadPage').contains(dayjs(tomorrow).format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(note1).should('not.exist');
    cy.get('@notepadPage').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${note2}`);
    cy.get('@notepadPage').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`{ctrl+s}`);
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadPage').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.reload();
    cy.get('@notepadPage').contains(dayjs(today).format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(note1).should('not.exist');
    cy.get('@notepadPage').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('@nextDateButton').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadPage').contains(dayjs(tomorrow).format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(note1).should('not.exist');
    cy.get('@notepadPage').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
  });

  it('enter note -> change date -> enter note -> change date', () => {
    cy.get('@notepadPage').contains(dayjs(today).format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(note1).should('not.exist');
    cy.get('@notepadPage').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${note1}`);
    cy.get('@notepadPage').contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('@nextDateButton').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadPage').contains(dayjs(tomorrow).format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(note1).should('not.exist');
    cy.get('@notepadPage').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${note2}`);
    cy.get('@notepadPage').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('@prevDateButton').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadPage').contains(dayjs(today).format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(note1).should('not.exist');
    cy.get('@notepadPage').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${note1}`);
    cy.get('@notepadPage').contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.reload();
    cy.get('@notepadPage').contains(dayjs(today).format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(note1).should('not.exist');
    cy.get('@notepadPage').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('@nextDateButton').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadPage').contains(dayjs(tomorrow).format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(note1).should('not.exist');
    cy.get('@notepadPage').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
  });
});
