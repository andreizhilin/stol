import { notesApi, useGetSettingsQuery, useUpdateSettingsMutation } from '@/features';

import { NotesSettings } from './types';

export const { useGetNoteByDateQuery, useUpdateNoteMutation } = notesApi;

export function useGetNotesSettingsQuery() {
  const result = useGetSettingsQuery();

  return {
    ...result,
    data: result.data?.notes,
  };
}
export function useUpdateNotesSettingsMutation() {
  const { data: settings } = useGetSettingsQuery();
  const [updateSettings, result] = useUpdateSettingsMutation();

  const updateNotesSettings = (notesSettings: NotesSettings) => {
    updateSettings({
      ...settings,
      notes: notesSettings,
    });
  };

  return [updateNotesSettings, result] as const;
}
