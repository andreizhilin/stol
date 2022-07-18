import { useCallback } from 'react';

import { Toggle } from '@/components';
import { useLocalization } from '@/features';

import { useGetAppearanceSettingsQuery, useUpdateAppearanceSettingsMutation } from './hooks';
import { localization } from './localization';

export function AppearanceSettingsWidget() {
  const { data: appearanceSettings } = useGetAppearanceSettingsQuery();
  const [updateSettings] = useUpdateAppearanceSettingsMutation();
  const { t } = useLocalization(localization);

  const handleDarkModeChange = useCallback(
    (isDarkMode: boolean) => {
      updateSettings({
        ...appearanceSettings,
        isDarkMode,
      });
    },
    [updateSettings, appearanceSettings],
  );

  return (
    <div data-test='isDarkMode'>
      <Toggle isChecked={appearanceSettings?.isDarkMode} onChange={handleDarkModeChange}>
        {t('DarkMode')}
      </Toggle>
    </div>
  );
}
