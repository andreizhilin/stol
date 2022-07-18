/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    signin(): Chainable<Element>;
  }
}
