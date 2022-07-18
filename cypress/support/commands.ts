/// <reference types="cypress" />

Cypress.Commands.add('signin', () => {
  cy.setCookie(
    'access_token',
    '3331bf14d58991e1a0332310462f5db4bf1215065c1ee3a218d7b30e1e8a47323075ee08cbae8f79031dece011d05aaa34eb216d058c9493779709a697ad924b',
  );
});
