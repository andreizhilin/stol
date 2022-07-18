/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    signin(): Chainable<Element>;
    waitSkeleton(skeletonSelector: string): Chainable<Element>;
    setLocale(locale: 'ru' | 'en'): Chainable<Element>;
  }
}
