import { useMemo, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { useGetSettingsQuery, useUpdateSettingsMutation } from '@/features';

import { localization as commonLocalization } from './localization';
import { Locale, LocalizationDictionary, LocalizationSettings } from './types';

const DEFAULT_LOCALE = Locale.En;

export function useGetLocalizationSettingsQuery() {
  const result = useGetSettingsQuery();

  return {
    ...result,
    data: result.data?.localization,
  };
}
export function useUpdateLocalizationSettingsMutation() {
  const { data: settings } = useGetSettingsQuery();
  const [updateSettings, result] = useUpdateSettingsMutation();

  const updateLocalizationSettings = (localizationSettings: LocalizationSettings) => {
    updateSettings({
      ...settings,
      localization: localizationSettings,
    });
  };

  return [updateLocalizationSettings, result] as const;
}

export function useLocalization(featureLocalization?: LocalizationDictionary) {
  const { data: localizationSettings, isFetching } = useGetLocalizationSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateLocalizationSettingsMutation();

  const locale = useMemo<Locale>(() => {
    return localizationSettings?.locale || (window.navigator.language?.substring(0, 2) as Locale) || DEFAULT_LOCALE;
  }, [localizationSettings?.locale]);

  function t(key: string) {
    return (
      featureLocalization?.[locale]?.[key] ??
      commonLocalization?.[locale]?.[key] ??
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
    dateFormat: locale === Locale.Ru ? 'D MMMM YYYY' : 'MMMM D, YYYY',
    t,
    isLoading: isFetching,
    isUpdating,
    updateLocale,
  };
}
