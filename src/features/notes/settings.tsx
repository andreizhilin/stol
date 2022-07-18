import { useCallback } from 'react';

import { Checkbox } from '@/components';

import { useGetNotesSettingsQuery, useUpdateNotesSettingsMutation } from './api';

export function NotepadSettingsWidget() {
  const { data: notesSettings, isFetching } = useGetNotesSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateNotesSettingsMutation();

  const handleAutoSaveChange = useCallback(
    (isAutoSaveEnabled: boolean) => {
      updateSettings({
        ...notesSettings,
        isAutoSaveEnabled,
      });
    },
    [updateSettings, notesSettings],
  );

  // TODO: Localization
  return (
    <div data-test='isAutoSaveEnabled'>
      <Checkbox
        isUpdating={isFetching || isUpdating}
        isChecked={notesSettings?.isAutoSaveEnabled}
        onChange={handleAutoSaveChange}
      >
        Auto save
      </Checkbox>
    </div>
  );
}
