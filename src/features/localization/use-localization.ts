import { useMemo, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { commonLocalizationDictionary } from './localization-dictionary';
import { useGetLocalizationSettingsQuery, useUpdateLocalizationSettingsMutation } from './api';
import { Locale, LocalizationDictionary } from './types';

const DEFAULT_LOCALE = Locale.En;

export function useLocalization(featureDictionary?: LocalizationDictionary) {
  const { data: localizationSettings, isFetching } = useGetLocalizationSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateLocalizationSettingsMutation();

  const locale = useMemo<Locale>(() => {
    return localizationSettings?.locale || (window.navigator.language?.substring(0, 2) as Locale) || DEFAULT_LOCALE;
  }, [localizationSettings?.locale]);

  function t(key: string) {
    return (
      featureDictionary?.[locale]?.[key] ??
      commonLocalizationDictionary?.[locale]?.[key] ??
      `Localization for [${locale}].[${key}] not found`
    );
  }

  function updateLocale(locale: Locale) {
    updateSettings({
      ...localizationSettings,
      locale,
    });
  }

  useEffect(() => {
    dayjs.locale(locale);
  }, [locale]);

  return {
    locale,
    t,
    isLoading: isFetching,
    isUpdating,
    updateLocale,
  };
}
