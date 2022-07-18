/// <reference types="cypress" />
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

describe('notepad', () => {
  const note1 = `\`1234567890-=\\qwertyuiop[]asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+|QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>?`;
  const note2 = `ё1234567890-=\\йцукенгшщзхъфывапролджэячсмитьбю.Ё!"№;%:?*()_+/ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,`;
  const note3 = 'note3';

  beforeEach(() => {
    cy.signin();
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.intercept('/api/note?date=*').as('getNote');
    cy.wait('@getNote');
    cy.get('[data-test="notepad-widget"]').as('notepadWidget');
  });

  afterEach(() => {
    cy.request('DELETE', '/api/notes');
    cy.request('DELETE', '/api/settings');
  });

  it('should save empty note', () => {
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`q{backspace}`);
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('[data-test="notepad-save-button"]:visible').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note2}`);
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`{ctrl+s}`);
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.reload();
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
  });

  it('should save non-empty note', () => {
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note2}`);
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`{ctrl+s}`);
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.reload();
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
  });

  it('should save multiple note corrections during one session', () => {
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note1}`);
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('[data-test="notepad-save-button"]:visible').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note2}`);
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`{ctrl+s}`);
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.reload();
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
  });

  it('should allow to edit existing note', () => {
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note1}`);
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('[data-test="notepad-save-button"]:visible').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.reload();
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note2}`);
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`{ctrl+s}`);
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.reload();
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
  });

  it('should allow to edit existing note with multiple corrections', () => {
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('@notepadWidget').contains(note3).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note1}`);
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('[data-test="notepad-save-button"]:visible').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.reload();
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('@notepadWidget').contains(note3).should('not.exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note2}`);
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`{ctrl+s}`);
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.get('[data-test="notepad-widget"] .ce-block').last().click().type(`${note3}`);
    cy.get('@notepadWidget').contains(note3).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('exist');

    cy.get('[data-test="notepad-save-button"]:visible').click();
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('@notepadWidget').contains(note3).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');

    cy.reload();
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('@notepadWidget').contains(note3).should('exist');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
  });

  it('should support dark mode', () => {
    // white theme
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.get('[data-test="notepad-widget"]').should('have.css', 'color', 'rgb(0, 0, 0)');

    // set dark theme
    cy.visit('https://127.0.0.1:3000/settings');
    cy.get('[data-test="isDarkMode"] label').click();

    // dark theme
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.get('.animate-spin').should('exist');
    cy.get('.animate-spin').should('not.exist');
    cy.get('[data-test="notepad-widget"]').should('have.css', 'color', 'rgb(255, 255, 255)');
  });
});
