import { localization } from '../localization';
import { Locale } from '../types';
import { useLocalization } from '../hooks';

export function LanguageSwitch() {
  const { t, locale, updateLocale } = useLocalization(localization);

  return (
    <div className='inline-flex rounded-md shadow-sm'>
      <button
        data-test='locale-ru'
        onClick={() => updateLocale(Locale.Ru)}
        type='button'
        className={`
          inline-flex items-center py-2 px-4 text-sm font-medium rounded-l-lg border border-r-0 border-gray-200
          hover:bg-gray-100
          disabled:bg-gray-100 disabled:shadow-inner
          dark:hover:bg-gray-700 
          dark:disabled:bg-gray-700 
        `}
        disabled={locale === Locale.Ru}
      >
        {t('Russian')}
      </button>
      <button
        data-test='locale-en'
        onClick={() => updateLocale(Locale.En)}
        type='button'
        className={`
          inline-flex items-center py-2 px-4 text-sm font-medium rounded-r-lg border border-gray-200 
          hover:bg-gray-100 
          disabled:bg-gray-100 disabled:shadow-inner
          dark:hover:bg-gray-700 
          dark:disabled:bg-gray-700 
        `}
        disabled={locale === Locale.En}
      >
        {t('English')}
      </button>
    </div>
  );
}
