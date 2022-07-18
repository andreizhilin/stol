import { useCallback } from 'react';

import { Checkbox } from '@/components';
import { useLocalization } from '@/features';

import { useGetNotesSettingsQuery, useUpdateNotesSettingsMutation } from './api';
import { notesLocalizationDictionary } from './localization-dictionary';

export function NotepadSettingsWidget() {
  const { data: notesSettings, isFetching } = useGetNotesSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateNotesSettingsMutation();
  const { t } = useLocalization(notesLocalizationDictionary);

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
      <Checkbox
        isUpdating={isFetching || isUpdating}
        isChecked={notesSettings?.isAutoSaveEnabled}
        onChange={handleAutoSaveChange}
      >
        {t('AutoSave')}
      </Checkbox>
    </div>
  );
}
