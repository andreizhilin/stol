/// <reference types="cypress" />

describe('notepad settings', () => {
  beforeEach(() => {
    cy.signin();
    cy.visit('https://127.0.0.1:3000/settings/notepad');
    cy.waitSkeleton('[data-testid="header-skeleton"]');
  });

  afterEach(() => {
    cy.request({ method: 'DELETE', url: '/api/settings', retryOnStatusCodeFailure: true });
  });

  it('should show disabled auto-save by default', () => {
    cy.get('[data-testid="auto-save"] input').should('not.be.checked');
  });

  it('should allow to switch auto-save back and forth', () => {
    cy.get('[data-testid="auto-save"] input').should('not.be.checked');
    cy.get('[data-testid="auto-save"]').click();
    cy.get('[data-testid="auto-save"] input').should('be.checked');

    cy.reload();
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.get('[data-testid="auto-save"] input').should('be.checked');
    cy.get('[data-testid="auto-save"]').click();
    cy.get('[data-testid="auto-save"] input').should('not.be.checked');

    cy.reload();
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.get('[data-testid="auto-save"] input').should('not.be.checked');
  });

  it('should be localized', () => {
    cy.contains('Auto Save').should('exist');
    cy.contains('Автосохранение').should('not.exist');

    cy.setLocale('ru');
    cy.visit('https://127.0.0.1:3000/settings/notepad');
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.contains('Auto Save').should('not.exist');
    cy.contains('Автосохранение').should('exist');
  });
});
