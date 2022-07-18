/// <reference types="cypress" />
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

describe('notepad', () => {
  const noteLine1 = 'Hello notepad!';
  const noteLine2 = 'How are you?';

  beforeEach(() => {
    cy.signin();
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.intercept('/api/note*').as('getNote');
    cy.wait('@getNote');
    cy.get('[data-test="notepad-page"]').as('notepadPage');
    cy.get('[data-test="prev-date-button"]').last().as('prevDateButton');
    cy.get('[data-test="next-date-button"]').last().as('nextDateButton');
  });

  after(() => {
    cy.request('DELETE', '/api/note', { date: new Date() });
  });

  it('should be editable', () => {
    cy.get('[data-test="notepad-page"] .ce-block')
      .last()
      .click()
      .type(`${noteLine1}{enter}`)
      .type(`${noteLine2}{enter}`);
    cy.get('@notepadPage').contains(noteLine1);
    cy.get('@notepadPage').contains(noteLine2);
  });

  it('should show note date', () => {
    cy.get('@notepadPage').contains(dayjs().format('D MMMM YYYY'));
  });

  it('should highlight that user has unsaved changes', () => {
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${noteLine1}{enter}`);
    cy.get('@notepadPage').contains(noteLine1);
    cy.get('[data-test="notepad-save-button"]').should('exist');
    cy.get('[data-test="notepad-save-button"]').click();
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${noteLine2}{enter}`);
    cy.get('@notepadPage').contains(noteLine2);
    cy.get('[data-test="notepad-save-button"]').should('exist');
    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`{ctrl+s}`);
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
  });

  it('should save data on the backend side', () => {
    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${noteLine1}{enter}`);
    cy.get('@notepadPage').contains(noteLine1);
    cy.get('[data-test="notepad-save-button"]').should('exist');
    cy.get('[data-test="notepad-save-button"]').click();
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.reload();
    cy.get('@notepadPage').contains(noteLine1);
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.get('[data-test="notepad-page"] .ce-block').last().click().type(`${noteLine2}{enter}`).type('{ctrl+s}');
    cy.get('[data-test="notepad-save-button"]').should('not.exist');
    cy.reload();
    cy.get('@notepadPage').contains(noteLine2);
  });

  it('should allow to jump by one day back and forth using arrow buttons', () => {
    cy.get('@notepadPage').contains(dayjs().add(-1, 'day').format('D MMMM YYYY')).should('not.exist');
    cy.get('@notepadPage').contains(dayjs().format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(dayjs().add(1, 'day').format('D MMMM YYYY')).should('not.exist');
    cy.get('@prevDateButton').click();
    cy.get('@notepadPage').contains(dayjs().add(-1, 'day').format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(dayjs().format('D MMMM YYYY')).should('not.exist');
    cy.get('@notepadPage').contains(dayjs().add(1, 'day').format('D MMMM YYYY')).should('not.exist');
    cy.get('@nextDateButton').click();
    cy.get('@notepadPage').contains(dayjs().add(-1, 'day').format('D MMMM YYYY')).should('not.exist');
    cy.get('@notepadPage').contains(dayjs().format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(dayjs().add(1, 'day').format('D MMMM YYYY')).should('not.exist');
    cy.get('@nextDateButton').click();
    cy.get('@notepadPage').contains(dayjs().add(-1, 'day').format('D MMMM YYYY')).should('not.exist');
    cy.get('@notepadPage').contains(dayjs().format('D MMMM YYYY')).should('not.exist');
    cy.get('@notepadPage').contains(dayjs().add(1, 'day').format('D MMMM YYYY'));
    cy.reload();
    cy.get('@notepadPage').contains(dayjs().add(-1, 'day').format('D MMMM YYYY')).should('not.exist');
    cy.get('@notepadPage').contains(dayjs().format('D MMMM YYYY'));
    cy.get('@notepadPage').contains(dayjs().add(1, 'day').format('D MMMM YYYY')).should('not.exist');
  });

  // TODO
  // it('should allow to jump by one day back and forth using swipes', () => {
  //   cy.get('@notepadPage').contains(dayjs().add(-1, 'day').format('D MMMM YYYY')).should('not.exist');
  //   cy.get('@notepadPage').contains(dayjs().format('D MMMM YYYY'));
  //   cy.get('@notepadPage').contains(dayjs().add(1, 'day').format('D MMMM YYYY')).should('not.exist');
  //   cy.get('@notepadPage')
  //     .trigger('pointerdown', { which: 1 })
  //     .trigger('pointermove', 'left')
  //     .trigger('pointerup', { force: true })
  //   cy.get('@notepadPage').contains(dayjs().add(-1, 'day').format('D MMMM YYYY'));
  //   cy.get('@notepadPage').contains(dayjs().format('D MMMM YYYY')).should('not.exist');
  //   cy.get('@notepadPage').contains(dayjs().add(1, 'day').format('D MMMM YYYY')).should('not.exist');
  //   cy.get('@notepadPage')
  //     .trigger('pointerdown', { which: 1 })
  //     .trigger('pointermove', 'right')
  //     .trigger('pointerup', { force: true })
  //   cy.get('@notepadPage').contains(dayjs().add(-1, 'day').format('D MMMM YYYY')).should('not.exist');
  //   cy.get('@notepadPage').contains(dayjs().format('D MMMM YYYY'));
  //   cy.get('@notepadPage').contains(dayjs().add(1, 'day').format('D MMMM YYYY')).should('not.exist');
  //   cy.get('@notepadPage')
  //     .trigger('pointerdown', { which: 1 })
  //     .trigger('pointermove', 'right')
  //     .trigger('pointerup', { force: true })
  //   cy.get('@notepadPage').contains(dayjs().add(-1, 'day').format('D MMMM YYYY')).should('not.exist');
  //   cy.get('@notepadPage').contains(dayjs().format('D MMMM YYYY')).should('not.exist');
  //   cy.get('@notepadPage').contains(dayjs().add(1, 'day').format('D MMMM YYYY'));
  //   cy.reload();
  //   cy.get('@notepadPage').contains(dayjs().add(-1, 'day').format('D MMMM YYYY')).should('not.exist');
  //   cy.get('@notepadPage').contains(dayjs().format('D MMMM YYYY'));
  //   cy.get('@notepadPage').contains(dayjs().add(1, 'day').format('D MMMM YYYY')).should('not.exist');
  // });
});
