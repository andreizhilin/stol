import React, { useCallback } from 'react';
import Toggle from '@atlaskit/toggle';

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
    <div className='flex items-center space-x-1'>
      <label htmlFor='auto-save' className='cursor-pointer'>
        {t('AutoSave')}
      </label>
      <Toggle
        id='auto-save'
        testId='auto-save'
        size='large'
        isChecked={notesSettings?.isAutoSaveEnabled}
        onChange={() => handleAutoSaveChange(!notesSettings?.isAutoSaveEnabled)}
      />
    </div>
  );
}
