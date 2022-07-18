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
    cy.get('[data-testid="header-skeleton"]').should('exist');
    cy.get('[data-testid="header-skeleton"]').should('not.exist');
    cy.get('[data-testid="notepad-page-skeleton"]').should('exist');
    cy.get('[data-testid="notepad-page-skeleton"]').should('not.exist');
    cy.get('[data-testid="notepad-widget"]').as('notepadWidget');
  });

  afterEach(() => {
    cy.request({ method: 'DELETE', url: '/api/notes', retryOnStatusCodeFailure: true });
    cy.request({ method: 'DELETE', url: '/api/settings', retryOnStatusCodeFailure: true });
  });

  it('should save empty note', () => {
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.get('[data-testid="notepad-widget"] .ce-block').last().click().type(`q{backspace}`);
    cy.get('[data-testid="save-button"]').should('not.be.disabled');

    cy.get('[data-testid="save-button"]:visible').click();
    cy.get('[data-testid="save-button"]').should('have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').should('not.have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').contains('Save').should('exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.get('[data-testid="notepad-widget"] .ce-block').last().click().type(`${note2}`);
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-testid="save-button"]').should('not.be.disabled');

    cy.get('[data-testid="save-button"]:visible').click();
    cy.get('[data-testid="save-button"]').should('have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').should('not.have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').contains('Save').should('exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.reload();
    cy.get('[data-testid="header-skeleton"]').should('exist');
    cy.get('[data-testid="header-skeleton"]').should('not.exist');
    cy.get('[data-testid="notepad-page-skeleton"]').should('exist');
    cy.get('[data-testid="notepad-page-skeleton"]').should('not.exist');
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');
  });

  it('should save non-empty note', () => {
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.get('[data-testid="notepad-widget"] .ce-block').last().click().type(`${note2}`);
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-testid="save-button"]').should('not.be.disabled');

    cy.get('[data-testid="save-button"]:visible').click();
    cy.get('[data-testid="save-button"]').should('have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').should('not.have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').contains('Save').should('exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.reload();
    cy.get('[data-testid="header-skeleton"]').should('exist');
    cy.get('[data-testid="header-skeleton"]').should('not.exist');
    cy.get('[data-testid="notepad-page-skeleton"]').should('exist');
    cy.get('[data-testid="notepad-page-skeleton"]').should('not.exist');
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');
  });

  it('should save multiple note corrections during one session', () => {
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.get('[data-testid="notepad-widget"] .ce-block').last().click().type(`${note1}`);
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('[data-testid="save-button"]').should('not.be.disabled');

    cy.get('[data-testid="save-button"]:visible').click();
    cy.get('[data-testid="save-button"]').should('have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').should('not.have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').contains('Save').should('exist');
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.get('[data-testid="notepad-widget"] .ce-block').last().click().type(`${note2}`);
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-testid="save-button"]').should('not.be.disabled');

    cy.get('[data-testid="save-button"]:visible').click();
    cy.get('[data-testid="save-button"]').should('have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').should('not.have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').contains('Save').should('exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.reload();
    cy.get('[data-testid="header-skeleton"]').should('exist');
    cy.get('[data-testid="header-skeleton"]').should('not.exist');
    cy.get('[data-testid="notepad-page-skeleton"]').should('exist');
    cy.get('[data-testid="notepad-page-skeleton"]').should('not.exist');
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');
  });

  it('should allow to edit existing note', () => {
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.get('[data-testid="notepad-widget"] .ce-block').last().click().type(`${note1}`);
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('[data-testid="save-button"]').should('not.be.disabled');

    cy.get('[data-testid="save-button"]:visible').click();
    cy.get('[data-testid="save-button"]').should('have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').should('not.have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').contains('Save').should('exist');
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.reload();
    cy.get('[data-testid="header-skeleton"]').should('exist');
    cy.get('[data-testid="header-skeleton"]').should('not.exist');
    cy.get('[data-testid="notepad-page-skeleton"]').should('exist');
    cy.get('[data-testid="notepad-page-skeleton"]').should('not.exist');
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.get('[data-testid="notepad-widget"] .ce-block').last().click().type(`${note2}`);
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-testid="save-button"]').should('not.be.disabled');

    cy.get('[data-testid="save-button"]:visible').click();
    cy.get('[data-testid="save-button"]').should('have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').should('not.have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').contains('Save').should('exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.reload();
    cy.get('[data-testid="header-skeleton"]').should('exist');
    cy.get('[data-testid="header-skeleton"]').should('not.exist');
    cy.get('[data-testid="notepad-page-skeleton"]').should('exist');
    cy.get('[data-testid="notepad-page-skeleton"]').should('not.exist');
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');
  });

  it('should allow to edit existing note with multiple corrections', () => {
    cy.get('@notepadWidget').contains(note1).should('not.exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('@notepadWidget').contains(note3).should('not.exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.get('[data-testid="notepad-widget"] .ce-block').last().click().type(`${note1}`);
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('[data-testid="save-button"]').should('not.be.disabled');

    cy.get('[data-testid="save-button"]:visible').click();
    cy.get('[data-testid="save-button"]').should('have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').should('not.have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').contains('Save').should('exist');
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.reload();
    cy.get('[data-testid="header-skeleton"]').should('exist');
    cy.get('[data-testid="header-skeleton"]').should('not.exist');
    cy.get('[data-testid="notepad-page-skeleton"]').should('exist');
    cy.get('[data-testid="notepad-page-skeleton"]').should('not.exist');
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('@notepadWidget').contains(note2).should('not.exist');
    cy.get('@notepadWidget').contains(note3).should('not.exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.get('[data-testid="notepad-widget"] .ce-block').last().click().type(`${note2}`);
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-testid="save-button"]').should('not.be.disabled');

    cy.get('[data-testid="save-button"]:visible').click();
    cy.get('[data-testid="save-button"]').should('have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').should('not.have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').contains('Save').should('exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.get('[data-testid="notepad-widget"] .ce-block').last().click().type(`${note3}`);
    cy.get('@notepadWidget').contains(note3).should('exist');
    cy.get('[data-testid="save-button"]').should('not.be.disabled');

    cy.get('[data-testid="save-button"]:visible').click();
    cy.get('[data-testid="save-button"]').should('have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').should('not.have.attr', 'data-has-overlay');
    cy.get('[data-testid="save-button"]').contains('Save').should('exist');
    cy.get('@notepadWidget').contains(note3).should('exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.reload();
    cy.get('[data-testid="header-skeleton"]').should('exist');
    cy.get('[data-testid="header-skeleton"]').should('not.exist');
    cy.get('[data-testid="notepad-page-skeleton"]').should('exist');
    cy.get('[data-testid="notepad-page-skeleton"]').should('not.exist');
    cy.get('@notepadWidget').contains(note1).should('exist');
    cy.get('@notepadWidget').contains(note2).should('exist');
    cy.get('@notepadWidget').contains(note3).should('exist');
    cy.get('[data-testid="save-button"]').should('be.disabled');
  });
});
