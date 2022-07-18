/// <reference types="cypress" />
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const AUTO_SAVE_MAX_DELAY_SECONDS = 21;

describe('notepad autosave', () => {
  const today = dayjs().toDate();
  const tomorrow = dayjs().add(1, 'day').toDate();
  const note1 = `\`1234567890-=\\qwertyuiop[]asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+|QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>?`;
  const note2 = `ё1234567890-=\\йцукенгшщзхъфывапролджэячсмитьбю.Ё!"№;%:?*()_+/ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,`;
  const note3 = 'note3';

  beforeEach(() => {
    cy.signin();

    // Enable auto-save
    cy.visit('https://127.0.0.1:3000/settings/notepad');
    cy.get('[data-test="isAutoSaveEnabled"] input').should('not.be.checked');
    cy.get('[data-test="isAutoSaveEnabled"] label').click();
    cy.get('[data-test="isAutoSaveEnabled"] input').should('be.checked');

    cy.visit('https://127.0.0.1:3000/notepad');
    cy.intercept('/api/note?date=*').as('getNote');
    cy.wait('@getNote');
    cy.get('[data-test="notepad-widget"]').as('notepadWidget');
    cy.get('[data-test="prev-date-button"]').last().as('prevDateButton');
    cy.get('[data-test="next-date-button"]').last().as('nextDateButton');
  });

  afterEach(() => {
    cy.request('DELETE', '/api/notes');
    cy.request('DELETE', '/api/settings');
  });

  it('should not work when setting is disabled', () => {
    cy.visit('https://127.0.0.1:3000/settings/notepad');
    cy.get('[data-test="isAutoSaveEnabled"] input').should('be.checked');
    cy.get('[data-test="isAutoSaveEnabled"] label').click();
    cy.get('[data-test="isAutoSaveEnabled"] input').should('not.be.checked');

    cy.visit('https://127.0.0.1:3000/notepad');
    cy.intercept('/api/note?date=*').as('getNote');
    cy.wait('@getNote');
    cy.get('[data-test="notepad-widget"]').as('notepadWidget');
    cy.get('[data-test="prev-date-button"]').last().as('prevDateButton');
    cy.get('[data-test="next-date-button"]').last().as('nextDateButton');

    cy.get('@notepadWidget').contains(dayjs(today).format('MMMM D, YYYY'));
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note1}`);
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.wait(AUTO_SAVE_MAX_DELAY_SECONDS * 1000);

    cy.get('[data-test="notepad-save-button"]').should('exist');
    cy.reload();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadWidget').contains(dayjs(today).format('MMMM D, YYYY'));
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
  });

  it('should save a note', () => {
    cy.get('@notepadWidget').contains(dayjs(today).format('MMMM D, YYYY'));
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note2}`);
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.wait(AUTO_SAVE_MAX_DELAY_SECONDS * 1000);
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.reload();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadWidget').contains(dayjs(today).format('MMMM D, YYYY'));
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
  });

  it('should save multiple note corrections during one session', () => {
    cy.get('@notepadWidget').contains(dayjs(today).format('MMMM D, YYYY'));
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note1}`);
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.wait(AUTO_SAVE_MAX_DELAY_SECONDS * 1000);
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note2}`);
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.wait(AUTO_SAVE_MAX_DELAY_SECONDS * 1000);
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.reload();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadWidget').contains(dayjs(today).format('MMMM D, YYYY'));
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
  });

  it('should allow to edit existing note', () => {
    cy.get('@notepadWidget').contains(dayjs(today).format('MMMM D, YYYY'));
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note1}`);
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.wait(AUTO_SAVE_MAX_DELAY_SECONDS * 1000);
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.reload();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadWidget').contains(dayjs(today).format('MMMM D, YYYY'));
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note2}`);
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.wait(AUTO_SAVE_MAX_DELAY_SECONDS * 1000);
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.reload();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadWidget').contains(dayjs(today).format('MMMM D, YYYY'));
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
  });

  it('should allow to edit existing note with multiple corrections', () => {
    cy.get('@notepadWidget').contains(dayjs(today).format('MMMM D, YYYY'));
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('@notepadWidget').contains(note3).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note1}`);
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.wait(AUTO_SAVE_MAX_DELAY_SECONDS * 1000);
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.reload();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadWidget').contains(dayjs(today).format('MMMM D, YYYY'));
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('@notepadWidget').contains(note3).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note2}`);
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.wait(AUTO_SAVE_MAX_DELAY_SECONDS * 1000);
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note3}`);
    cy.get('@notepadWidget').contains(note3).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.wait(AUTO_SAVE_MAX_DELAY_SECONDS * 1000);
    cy.get('@notepadWidget').contains(note3).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.reload();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadWidget').contains(dayjs(today).format('MMMM D, YYYY'));
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('@notepadWidget').contains(note3).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
  });

  it('should not save a note if date has changed', () => {
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note1}`);
    cy.contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('@nextDateButton').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.contains(dayjs(tomorrow).format('MMMM D, YYYY'));
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');

    cy.wait(AUTO_SAVE_MAX_DELAY_SECONDS * 1000);

    cy.get('@prevDateButton').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');
  });

  it('should save a note between date changes', () => {
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note1}`);
    cy.contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.wait(AUTO_SAVE_MAX_DELAY_SECONDS * 1000);

    cy.get('@nextDateButton').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.contains(dayjs(tomorrow).format('MMMM D, YYYY'));
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');

    cy.get('@prevDateButton').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.contains(note1).should('exist');
    cy.contains(note2).should('not.exist');
  });

  it('should save changes made on non-default date', () => {
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('@nextDateButton').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.contains(dayjs(tomorrow).format('MMMM D, YYYY'));
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');

    cy.contains(dayjs(tomorrow).format('MMMM D, YYYY'));
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note1}`);
    cy.contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.wait(AUTO_SAVE_MAX_DELAY_SECONDS * 1000);
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.contains(note1).should('exist');

    cy.reload();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    cy.contains(note1).should('not.exist');
    cy.contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('@nextDateButton').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.contains(dayjs(tomorrow).format('MMMM D, YYYY'));
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.contains(note1).should('exist');
    cy.contains(note2).should('not.exist');
  });
});
