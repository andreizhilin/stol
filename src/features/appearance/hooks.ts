import { useGetSettingsQuery, useUpdateSettingsMutation } from '@/features';

import { AppearanceSettings } from './types';

export function useGetAppearanceSettingsQuery() {
  const result = useGetSettingsQuery();

  return {
    ...result,
    data: result.data?.appearance,
  };
}
export function useUpdateAppearanceSettingsMutation() {
  const { data: settings } = useGetSettingsQuery();
  const [updateSettings, result] = useUpdateSettingsMutation();

  const updateAppearanceSettings = (appearanceSettings: AppearanceSettings) => {
    updateSettings({
      ...settings,
      appearance: appearanceSettings,
    });
  };

  return [updateAppearanceSettings, result] as const;
}

export function useAppearance() {
  const { data } = useGetAppearanceSettingsQuery();

  return {
    isDarkMode: data?.isDarkMode,
  };
}
