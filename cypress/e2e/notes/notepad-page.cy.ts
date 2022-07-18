/// <reference types="cypress" />
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

describe('notepad', () => {
  const today = dayjs().toDate();
  const tomorrow = dayjs().add(1, 'day').toDate();
  const emptyNote = 'q{backspace}';
  const note1 = `\`1234567890-=\\qwertyuiop[]asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+|QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>?`;
  const note2 = `ё1234567890-=\\йцукенгшщзхъфывапролджэячсмитьбю.Ё!"№;%:?*()_+/ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,`;
  const note3 = 'note3';

  const container = '[data-testid="notepad-page"]';
  const textInput = `${container} .ce-block`;
  const datePicker = `${container} [data-testid="select-date"]`;
  const selectedDate = '[data-testid="calendar--container"] [data-selected="true"]';
  const saveButton = `${container} [data-testid="save-button"]`;

  function writeText(text: string) {
    cy.get(container).contains(text).should('not.exist');
    cy.get(textInput).last().click().type(text);
    cy.get(saveButton).should('not.be.disabled');
  }

  function save() {
    cy.get(saveButton).should('not.be.disabled');
    cy.get(saveButton).click();
    cy.get(saveButton).should('have.attr', 'data-has-overlay');
    cy.get(saveButton).should('not.have.attr', 'data-has-overlay');
    cy.get(saveButton).should('be.disabled');
  }

  function reload() {
    cy.reload();
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="notepad-page-skeleton"]');
  }

  function verifyNoteNotExist(text: string) {
    cy.get(container).contains(text).should('not.exist');
  }

  function verifyNoteExists(text: string) {
    cy.get(container).contains(text).should('exist');
  }

  function verifyFormPristine() {
    cy.get(saveButton).should('be.disabled');
  }

  function selectPrevDate() {
    cy.get(datePicker).click();
    cy.get(selectedDate).then($selectedDate => {
      if ($selectedDate.parent().children().first().attr('data-selected')) {
        cy.get(selectedDate).parent().prev().children().last().click();
      } else {
        cy.get(selectedDate).prev().click();
      }

      cy.waitSkeleton('[data-testid="notepad-page-skeleton"]');
    });
  }

  function selectNextDate() {
    cy.get(datePicker).click();
    cy.get(selectedDate).then($selectedDate => {
      if ($selectedDate.parent().children().last().attr('data-selected')) {
        cy.get(selectedDate).parent().next().children().first().click();
      } else {
        cy.get(selectedDate).next().click();
      }

      cy.waitSkeleton('[data-testid="notepad-page-skeleton"]');
    });
  }

  beforeEach(() => {
    cy.signin();
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="notepad-page-skeleton"]');
  });

  afterEach(() => {
    cy.request({ method: 'DELETE', url: '/api/notes', retryOnStatusCodeFailure: true });
    cy.request({ method: 'DELETE', url: '/api/settings', retryOnStatusCodeFailure: true });
  });

  it('should save empty and non-empty note', () => {
    verifyNoteNotExist(note2);
    verifyFormPristine();

    writeText(emptyNote);
    save();

    reload();
    verifyNoteNotExist(note2);
    verifyFormPristine();

    writeText(emptyNote);
    save();

    writeText(note2);
    save();
    verifyNoteExists(note2);

    reload();
    verifyNoteExists(note2);
    verifyFormPristine();
  });

  it('should save multiple note corrections during one session', () => {
    verifyNoteNotExist(note1);
    verifyNoteNotExist(note2);
    verifyFormPristine();

    writeText(note1);
    save();
    verifyNoteExists(note1);
    verifyNoteNotExist(note2);

    writeText(note2);
    save();
    verifyNoteExists(note1);
    verifyNoteExists(note2);

    reload();
    verifyNoteExists(note1);
    verifyNoteExists(note2);
  });

  it('should allow to edit existing note', () => {
    verifyNoteNotExist(note1);
    verifyNoteNotExist(note2);
    verifyFormPristine();

    writeText(note1);
    save();
    verifyNoteExists(note1);
    verifyNoteNotExist(note2);

    reload();
    verifyNoteExists(note1);
    verifyNoteNotExist(note2);

    writeText(note2);
    save();
    verifyNoteExists(note1);
    verifyNoteExists(note2);

    reload();
    verifyNoteExists(note1);
    verifyNoteExists(note2);
  });

  it('should allow to edit existing note with multiple corrections', () => {
    verifyNoteNotExist(note1);
    verifyNoteNotExist(note2);
    verifyNoteNotExist(note3);
    verifyFormPristine();

    writeText(note1);
    save();
    verifyNoteExists(note1);
    verifyNoteNotExist(note2);
    verifyNoteNotExist(note3);

    reload();
    verifyNoteExists(note1);
    verifyNoteNotExist(note2);
    verifyNoteNotExist(note3);

    writeText(note2);
    save();
    verifyNoteExists(note1);
    verifyNoteExists(note2);
    verifyNoteNotExist(note3);

    writeText(note3);
    save();
    verifyNoteExists(note1);
    verifyNoteExists(note2);
    verifyNoteExists(note3);

    reload();
    verifyNoteExists(note1);
    verifyNoteExists(note2);
    verifyNoteExists(note3);
  });

  it('should clear unsaved note on date change', () => {
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    verifyNoteNotExist(note1);
    verifyFormPristine();

    writeText(note1);
    verifyNoteExists(note1);

    selectNextDate();
    cy.contains(dayjs(tomorrow).format('MMMM D, YYYY'));
    verifyNoteNotExist(note1);
    verifyFormPristine();

    selectPrevDate();
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    verifyNoteNotExist(note1);
    verifyFormPristine();
  });

  it('should keep saved changes after date change', () => {
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    verifyNoteNotExist(note1);
    verifyFormPristine();

    writeText(note1);
    save();
    verifyNoteExists(note1);

    selectNextDate();
    cy.contains(dayjs(tomorrow).format('MMMM D, YYYY'));
    verifyNoteNotExist(note1);
    verifyFormPristine();

    selectPrevDate();
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    verifyNoteExists(note1);
    verifyFormPristine();

    reload();
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    verifyNoteExists(note1);
    verifyFormPristine();
  });

  it('should keep changes saved on non-default date after date change', () => {
    selectNextDate();
    cy.contains(dayjs(tomorrow).format('MMMM D, YYYY'));
    verifyNoteNotExist(note1);
    verifyFormPristine();

    writeText(note1);
    save();
    verifyNoteExists(note1);

    selectPrevDate();
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    verifyNoteNotExist(note1);
    verifyFormPristine();

    selectNextDate();
    cy.contains(dayjs(tomorrow).format('MMMM D, YYYY'));
    verifyNoteExists(note1);
    verifyFormPristine();

    reload();
    cy.contains(dayjs(today).format('MMMM D, YYYY'));
    verifyNoteNotExist(note1);
    verifyFormPristine();

    selectNextDate();
    cy.contains(dayjs(tomorrow).format('MMMM D, YYYY'));
    verifyNoteExists(note1);
    verifyFormPristine();
  });

  it('should be localized', () => {
    cy.contains(dayjs(today).format('MMMM D, YYYY')).should('exist');
    cy.contains(dayjs(today).locale('ru').format('D MMMM YYYY')).should('not.exist');
    cy.get(container).contains('Select Date').should('exist');
    cy.get(container).contains('Save').should('exist');
    cy.get(container).contains('Выбрать дату').should('not.exist');
    cy.get(container).contains('Сохранить').should('not.exist');

    cy.setLocale('ru');
    cy.visit('https://127.0.0.1:3000/notepad');
    cy.waitSkeleton('[data-testid="header-skeleton"]');
    cy.waitSkeleton('[data-testid="notepad-page-skeleton"]');
    cy.contains(dayjs(today).format('MMMM D, YYYY')).should('not.exist');
    cy.contains(dayjs(today).locale('ru').format('D MMMM YYYY')).should('exist');
    cy.get(container).contains('Select Date').should('not.exist');
    cy.get(container).contains('Save').should('not.exist');
    cy.get(container).contains('Выбрать дату').should('exist');
    cy.get(container).contains('Сохранить').should('exist');
  });
});
