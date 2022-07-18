import { useGetSettingsQuery, useUpdateSettingsMutation } from '../settings';
import { LocalizationSettings } from './types';

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
