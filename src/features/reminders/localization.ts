import { Locale, LocalizationDictionary } from '@/features';

export const localization: LocalizationDictionary = {
  [Locale.En]: {
    Title: 'Create a new reminder',
    Date: 'Date',
    Text: 'Reminder',
    Cancel: 'Close',
    Submit: 'Create reminder',
    EmptyState: 'There are no reminder for this date',
  },
  [Locale.Ru]: {
    Title: 'Добавить новое напоминание',
    Date: 'Когда?',
    Text: 'О чём напомнить?',
    Cancel: 'Закрыть',
    Submit: 'Добавить напоминание',
    EmptyState: 'Напоминаний нет',
  },
};
