/// <reference types="cypress" />
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

describe('notepad', () => {
  const text1 = `\`1234567890-=\\qwertyuiop[]asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+|QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>?`;
  const text2 = `ё1234567890-=\\йцукенгшщзхъфывапролджэячсмитьбю.Ё!"№;%:?*()_+/ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,`;
  const today = dayjs().toDate();
  const tomorrow = dayjs(today).add(1, 'day').toDate();

  const container = '[data-testid="reminders-page"]';
  const textInput = `${container} [name="text"]`;
  const submitButton = `${container} [type="submit"]`;

  function writeText(text: string) {
    cy.get(textInput).should('not.have.attr', 'value', text);
    cy.get(textInput).type(text);
    cy.get(textInput).should('have.attr', 'value', text);
  }

  function save() {
    cy.get(submitButton).should('not.be.disabled').should('not.have.attr', 'data-has-overlay');
    cy.get(submitButton).click();
    cy.get(submitButton).should('have.attr', 'data-has-overlay');
    cy.get(submitButton).should('not.have.attr', 'data-has-overlay');
  }

  function verifyReminderNotExist(text: string) {
    cy.get(container).contains(text).should('not.exist');
  }

  function verifyEmptyState() {
    cy.get(container).contains('There are no reminder for this date').should('exist');
  }

  function verifyReminderExists(text: string) {
    cy.get(container).contains(text).should('exist');
    cy.get(container).contains('There are no reminder for this date').should('not.exist');
  }

  function verifyFormClean(text: string) {
    cy.get(textInput).should('not.have.attr', 'value', text);
  }

  function selectPrevDate() {
    cy.get(`${container} [data-testid="calendar--container"] [data-selected="true"]`).prev().click();
  }

  function selectNextDate() {
    cy.get(`${container} [data-testid="calendar--container"] [data-selected="true"]`).next().click();
  }

  function removeReminder() {
    cy.get(`${container} [data-testid="remove-reminder"]`).first().click();
    // TODO: Once success notifications are ready, replace with appearance check
    cy.wait(2000);
  }

  beforeEach(() => {
    cy.signin();
    cy.visit('https://127.0.0.1:3000/reminders');
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="reminders-page-skeleton"]');
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
  });

  afterEach(() => {
    cy.request({ method: 'DELETE', url: '/api/reminders', retryOnStatusCodeFailure: true });
    cy.request({ method: 'DELETE', url: '/api/settings', retryOnStatusCodeFailure: true });
  });

  it('should validate save empty reminder', () => {
    cy.get(textInput).invoke('prop', 'validationMessage').should('equal', 'Please fill out this field.');
    writeText(text1);
    cy.get(textInput).invoke('prop', 'validationMessage').should('not.equal', 'Please fill out this field.');
    verifyReminderNotExist(text1);
    verifyEmptyState();
  });

  it('should save non-empty reminder', () => {
    verifyReminderNotExist(text1 + text2);
    verifyEmptyState();
    writeText(text1 + text2);
    save();
    verifyFormClean(text1 + text2);
    verifyReminderExists(text1 + text2);

    cy.reload();
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="reminders-page-skeleton"]');
    verifyReminderExists(text1 + text2);
  });

  it('should save multiple reminders during one session', () => {
    verifyReminderNotExist(text1);
    verifyReminderNotExist(text2);
    verifyEmptyState();
    writeText(text1);
    save();

    verifyFormClean(text1);
    verifyReminderExists(text1);
    verifyReminderNotExist(text2);
    writeText(text2);
    save();

    verifyFormClean(text2);
    verifyReminderExists(text1);
    verifyReminderExists(text2);

    cy.reload();
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="reminders-page-skeleton"]');
    verifyReminderExists(text1);
    verifyReminderExists(text2);
  });

  it('should keep reminder text when date changes', () => {
    writeText(text1);
    selectNextDate();
    cy.contains(dayjs(tomorrow).format('MMMM D, YYYY'));
    cy.get(textInput).should('have.attr', 'value', text1);
  });

  it('should keep saved changes between date change', () => {
    verifyReminderNotExist(text1);
    verifyReminderNotExist(text2);
    verifyEmptyState();
    writeText(text1);
    save();
    verifyFormClean(text1);
    verifyReminderExists(text1);
    verifyReminderNotExist(text2);

    selectNextDate();
    cy.contains(dayjs(tomorrow).format('MMMM D, YYYY'));
    verifyReminderNotExist(text1);
    verifyReminderNotExist(text2);
    verifyEmptyState();
    writeText(text2);
    save();
    verifyFormClean(text2);
    verifyReminderExists(text2);
    verifyReminderNotExist(text1);

    selectPrevDate();
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    verifyFormClean(text1);
    verifyReminderExists(text1);
    verifyReminderNotExist(text2);

    selectNextDate();
    cy.contains(dayjs(tomorrow).format('MMMM D, YYYY'));
    verifyFormClean(text2);
    verifyReminderExists(text2);
    verifyReminderNotExist(text1);

    cy.reload();
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="reminders-page-skeleton"]');
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    verifyFormClean(text1);
    verifyReminderExists(text1);
    verifyReminderNotExist(text2);

    selectNextDate();
    cy.contains(dayjs(tomorrow).format('MMMM D, YYYY'));
    verifyFormClean(text2);
    verifyReminderExists(text2);
    verifyReminderNotExist(text1);
  });

  it('should allow to remove reminder after save', () => {
    writeText(text1);
    save();
    verifyReminderExists(text1);
    removeReminder();
    verifyReminderNotExist(text1);

    cy.reload();
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="reminders-page-skeleton"]');
    verifyReminderNotExist(text1);
  });

  it('should allow to remove existing reminder', () => {
    writeText(text1);
    save();
    verifyReminderExists(text1);

    cy.reload();
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="reminders-page-skeleton"]');
    verifyReminderExists(text1);

    removeReminder();
    verifyReminderNotExist(text1);

    cy.reload();
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="reminders-page-skeleton"]');
    verifyReminderNotExist(text1);
  });

  it('should remove one of many existing reminders', () => {
    writeText(text1);
    save();
    verifyReminderExists(text1);
    writeText(text2);
    save();
    verifyReminderExists(text2);

    cy.reload();
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="reminders-page-skeleton"]');
    verifyReminderExists(text1);
    verifyReminderExists(text2);

    removeReminder();
    verifyReminderNotExist(text1);
    verifyReminderExists(text2);

    cy.reload();
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="reminders-page-skeleton"]');
    verifyReminderNotExist(text1);
    verifyReminderExists(text2);
  });

  it('should remove many reminders one by one', () => {
    writeText(text1);
    save();
    verifyReminderExists(text1);
    writeText(text2);
    save();
    verifyReminderExists(text2);

    cy.reload();
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="reminders-page-skeleton"]');
    verifyReminderExists(text1);
    verifyReminderExists(text2);

    removeReminder();
    verifyReminderNotExist(text1);
    verifyReminderExists(text2);
    removeReminder();
    verifyReminderNotExist(text1);
    verifyReminderNotExist(text2);

    cy.reload();
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="reminders-page-skeleton"]');
    verifyReminderNotExist(text1);
    verifyReminderNotExist(text2);
  });

  it('should be localized', () => {
    cy.get(container).contains('Reminder').should('exist');
    cy.get(container).contains('Create reminder').should('exist');
    cy.get(container).contains('There are no reminder for this date').should('exist');
    cy.contains(dayjs(today).format('MMMM D, YYYY')).should('exist');
    cy.get(container).contains('О чём напомнить?').should('not.exist');
    cy.get(container).contains('Добавить напоминание').should('not.exist');
    cy.get(container).contains('Напоминаний нет').should('not.exist');
    cy.contains(dayjs(today).locale('ru').format('D MMMM YYYY')).should('not.exist');

    cy.setLocale('ru');
    cy.visit('https://127.0.0.1:3000/reminders');
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="reminders-page-skeleton"]');
    cy.get(container).contains('Reminder').should('not.exist');
    cy.get(container).contains('Create reminder').should('not.exist');
    cy.get(container).contains('There are no reminder for this date').should('not.exist');
    cy.contains(dayjs(today).format('MMMM D, YYYY')).should('not.exist');
    cy.get(container).contains('О чём напомнить?').should('exist');
    cy.get(container).contains('Добавить напоминание').should('exist');
    cy.get(container).contains('Напоминаний нет').should('exist');
    cy.contains(dayjs(today).locale('ru').format('D MMMM YYYY')).should('exist');
  });
});
