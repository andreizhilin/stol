/// <reference types="cypress" />
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

describe('notepad', () => {
  const noteLine1 = 'Hello notepad!';
  const noteLine2 = 'How are you?';

  beforeEach(() => {
    cy.visit('http://localhost:3000/notepad');
  });

  it('should be editable', () => {
    cy.get('[data-test="notepad-page"] .ce-block')
      .last()
      .click()
      .type(`${noteLine1}{enter}`)
      .type(`${noteLine2}{enter}`);
    cy.contains(noteLine1);
    cy.contains(noteLine2);
  });

  it('should show note date', () => {
    cy.contains(dayjs().format('D MMMM YYYY'));
  });

  it('should highlight that user has unsaved changes', () => {
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${noteLine1}{enter}`);
    cy.contains(noteLine1);
    cy.get('[data-test="notepad-save-button"]').should('exist');
    cy.get('[data-test="notepad-save-button"]').click();
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${noteLine2}{enter}`);
    cy.contains(noteLine2);
    cy.get('[data-test="notepad-save-button"]').should('exist');
    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`{ctrl+s}`);
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
  });

  it('should save data on the backend side', () => {
    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${noteLine1}{enter}`);
    cy.contains(noteLine1);
    cy.get('[data-test="notepad-save-button"]').should('exist');
    cy.get('[data-test="notepad-save-button"]').click();
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.reload();
    cy.contains(noteLine1);
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${noteLine2}{enter}`).type('{ctrl+s}');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.reload();
    cy.contains(noteLine2);
  });
});
