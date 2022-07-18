import { Locale, LocalizationDictionary } from './types';

export const localization: LocalizationDictionary = {
  [Locale.En]: {
    English: 'English',
    Russian: 'Русский',
    DocumentTitle: 'Stol - useful desktop',
    AppName: 'Stol',
    Create: 'Create',
    Remove: 'Remove',
    Reset: 'Reset',
    RequiredError: 'This field is required',
  },
  [Locale.Ru]: {
    English: 'English',
    Russian: 'Русский',
    DocumentTitle: 'Полезный рабочий "Стол"',
    AppName: 'Стол',
    Create: 'Создать',
    Remove: 'Удалить',
    Reset: 'Очистить',
    RequiredError: 'Нужно заполнить это поле',
  },
};
