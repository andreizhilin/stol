import { useCallback } from 'react';

import { Toggle } from '@/components';
import { useLocalization } from '@/features';

import { useGetNotesSettingsQuery, useUpdateNotesSettingsMutation } from '../hooks';
import { localization } from '../localization';

export function NotepadSettingsWidget() {
  const { data: notesSettings } = useGetNotesSettingsQuery();
  const [updateSettings] = useUpdateNotesSettingsMutation();
  const { t } = useLocalization(localization);

  const handleAutoSaveChange = useCallback(
    (isAutoSaveEnabled: boolean) => {
      updateSettings({
        ...notesSettings,
        isAutoSaveEnabled,
      });
    },
    [updateSettings, notesSettings],
  );

  return (
    <div data-test='isAutoSaveEnabled'>
      <Toggle isChecked={notesSettings?.isAutoSaveEnabled} onChange={handleAutoSaveChange}>
        {t('AutoSave')}
      </Toggle>
    </div>
  );
}
