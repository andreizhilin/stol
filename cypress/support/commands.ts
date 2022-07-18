/// <reference types="cypress" />

Cypress.Commands.add('signin', () => {
  cy.clearCookies();
  // e2e user
  cy.setCookie(
    'access_token',
    '3331bf14d58991e1a0332310462f5db4bf1215065c1ee3a218d7b30e1e8a47323075ee08cbae8f79031dece011d05aaa34eb216d058c9493779709a697ad924b',
  );
  // add small delay to ensure that loading states will be visible/testable
  cy.setCookie('e2e-delay', '200');
});

Cypress.Commands.add('waitSkeleton', (skeletonSelector: string) => {
  cy.get(skeletonSelector).should('exist');
  cy.get(skeletonSelector).should('not.exist');
});

Cypress.Commands.add('setLocale', (locale: 'ru' | 'en') => {
  cy.visit('https://127.0.0.1:3000/settings');
  cy.waitSkeleton('[data-testid="header-skeleton"]');
  cy.get(`[data-testid="locale-${locale}"]`).click();
});
