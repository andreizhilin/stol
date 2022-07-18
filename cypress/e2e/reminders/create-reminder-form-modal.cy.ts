/// <reference types="cypress" />
import dayjs from 'dayjs';

describe('Create reminder form modal', () => {
  const text1 = `\`1234567890-=\\qwertyuiop[]asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+|QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>?`;
  const text2 = `ё1234567890-=\\йцукенгшщзхъфывапролджэячсмитьбю.Ё!"№;%:?*()_+/ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,`;

  const container = '[data-testid="create-reminder-form-modal"]';
  const textInput = `${container} [name="text"]`;
  const dateInput = `${container} [name="remindAt"]`;
  const submitButton = `${container} [type="submit"]`;

  function openModal() {
    cy.get('[data-testid="create-button"]').click();
    cy.get('[data-testid="create-reminder-button"]').click();
    cy.get('[data-testid="create-reminder-button"]').should('not.exist');
    cy.get(container).should('exist');
  }

  function writeText(text: string) {
    cy.get(textInput).should('not.have.attr', 'value', text);
    cy.get(textInput).focus();
    cy.wait(500);
    cy.get(textInput).type(text);
    cy.get(textInput).should('have.attr', 'value', text);
  }

  function selectDate() {
    cy.get(container).contains(dayjs().format('M/D/YYYY')).should('not.exist');
    cy.get(dateInput).parent().click();
    cy.get(`${container} [data-today="true"]`).click();
    cy.get(container).contains(dayjs().format('M/D/YYYY')).should('exist');
  }

  function save() {
    cy.get(submitButton).should('not.be.disabled').click();
  }

  function close() {
    cy.get(`${container} [data-testid="close-button"]`).click();
  }

  function goHome() {
    cy.visit('https://127.0.0.1:3000/');
    cy.waitSkeleton('[data-testid="header-skeleton"]');
  }

  function verifyReminderNotExist(text: string) {
    cy.visit('https://127.0.0.1:3000/reminders');
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="reminders-page-skeleton"]');
    cy.get('[data-testid="reminders-page"]').contains(text).should('not.exist');
    cy.get('[data-testid="reminders-page"]').contains('There are no reminder for this date').should('exist');
  }

  function verifyReminderExists(text: string) {
    cy.visit('https://127.0.0.1:3000/reminders');
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="reminders-page-skeleton"]');
    cy.get('[data-testid="reminders-page"]').contains(text).should('exist');
    cy.get('[data-testid="reminders-page"]').contains('There are no reminder for this date').should('not.exist');
  }

  function verifyFormClean(text: string) {
    cy.get(textInput).should('not.have.attr', 'value', text);
    cy.get(container).contains(dayjs().format('DD.MM.YYYY')).should('not.exist');
  }

  beforeEach(() => {
    cy.signin();
    goHome();
  });

  afterEach(() => {
    cy.request({ method: 'DELETE', url: '/api/reminders', retryOnStatusCodeFailure: true });
    cy.request({ method: 'DELETE', url: '/api/settings', retryOnStatusCodeFailure: true });
  });

  it('should reset form on close', () => {
    openModal();
    verifyFormClean(text1);
    writeText(text1);
    selectDate();
    close();
    openModal();
    verifyFormClean(text1);
    close();
    verifyReminderNotExist(text1);
  });

  it('should save a valid reminder', () => {
    verifyReminderNotExist(text1 + text2);
    goHome();
    openModal();
    verifyFormClean(text1 + text2);
    writeText(text1 + text2);
    selectDate();
    save();
    openModal();
    verifyFormClean(text1 + text2);
    close();
    verifyReminderExists(text1);
  });

  it('should validate date field', () => {
    openModal();
    writeText(text2);
    cy.get(container).contains('This field is required').should('not.exist');
    save();
    cy.get(container).contains('This field is required').should('exist');
    selectDate();
    cy.get(container).contains('This field is required').should('not.exist');
    close();
    verifyReminderNotExist(text2);
  });

  it('should validate text field', () => {
    openModal();
    selectDate();
    save();
    cy.get(textInput).invoke('prop', 'validationMessage').should('equal', 'Please fill out this field.');
    writeText(text2);
    cy.get(textInput).invoke('prop', 'validationMessage').should('not.equal', 'Please fill out this field.');
    close();
    verifyReminderNotExist(text2);
  });

  it('should show added reminder via modal on reminders page', () => {
    verifyReminderNotExist(text1);
    openModal();
    writeText(text1);
    selectDate();
    save();
    verifyReminderExists(text1);
  });

  it('should be localized', () => {
    openModal();
    writeText(text1);
    save();
    cy.get(container).contains('Create a new reminder').should('exist');
    cy.get(container).contains('Reminder').should('exist');
    cy.get(container).contains('Date').should('exist');
    cy.get(container).contains('Close').should('exist');
    cy.get(container).contains('Create reminder').should('exist');
    cy.get(container).contains('This field is required').should('exist');
    cy.get(container).contains('Добавить новое напоминание').should('not.exist');
    cy.get(container).contains('О чём напомнить?').should('not.exist');
    cy.get(container).contains('Когда?').should('not.exist');
    cy.get(container).contains('Закрыть').should('not.exist');
    cy.get(container).contains('Добавить напоминание').should('not.exist');
    cy.get(container).contains('Нужно заполнить это поле').should('not.exist');

    cy.setLocale('ru');
    cy.visit('https://127.0.0.1:3000/');
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    openModal();
    writeText(text1);
    save();
    cy.get(container).contains('Create a new reminder').should('not.exist');
    cy.get(container).contains('Reminder').should('not.exist');
    cy.get(container).contains('Date').should('not.exist');
    cy.get(container).contains('Close').should('not.exist');
    cy.get(container).contains('Create reminder').should('not.exist');
    cy.get(container).contains('This field is required').should('not.exist');
    cy.get(container).contains('Добавить новое напоминание').should('exist');
    cy.get(container).contains('О чём напомнить?').should('exist');
    cy.get(container).contains('Когда?').should('exist');
    cy.get(container).contains('Закрыть').should('exist');
    cy.get(container).contains('Добавить напоминание').should('exist');
    cy.get(container).contains('Нужно заполнить это поле').should('exist');
  });
});
