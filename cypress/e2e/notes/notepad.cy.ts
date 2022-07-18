/// <reference types="cypress" />
describe('notepad', () => {
  const noteLine1 = 'Hello notepad!';
  const noteLine2 = 'How are you?';

  beforeEach(() => {
    cy.visit('http://localhost:3000/notepad');
  });

  it('should be editable', () => {
    cy.wait(1);
    cy.get('[data-test="notepad"] .ce-block').last().click().type(`${noteLine1}{enter}`).type(`${noteLine2}{enter}`);
    cy.contains(noteLine1);
    cy.contains(noteLine2);
  });
});
