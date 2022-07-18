import React from 'react';

import { localization } from '../localization';
import { Locale } from '../types';
import { useLocalization } from '../hooks';

export function LanguageSwitch() {
  const { t, locale, updateLocale } = useLocalization(localization);
  const sharedCssClasses = `
    inline-flex items-center py-2 px-4 text-sm font-medium border border-gray-200 
    hover:bg-gray-100 
    disabled:bg-gray-100 disabled:shadow-inner
  `;

  return (
    <div className='inline-flex rounded-md shadow-sm'>
      <button
        data-testid='locale-ru'
        onClick={() => updateLocale(Locale.Ru)}
        type='button'
        className={`${sharedCssClasses} rounded-l-lg border-r-0`}
        disabled={locale === Locale.Ru}
      >
        {t('Russian')}
      </button>
      <button
        data-testid='locale-en'
        onClick={() => updateLocale(Locale.En)}
        type='button'
        className={`${sharedCssClasses} rounded-r-lg`}
        disabled={locale === Locale.En}
      >
        {t('English')}
      </button>
    </div>
  );
}
