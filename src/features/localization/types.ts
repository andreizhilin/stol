export enum Locale {
  En = 'en',
  Ru = 'ru',
}

export type LocalizationDictionary = {
  [locale in Locale]: {
    [key: string]: string;
  };
};

export type LocalizationSettings = {
  locale: Locale;
};
