import { NotesSettings, LocalizationSettings } from '@/features';

export type Settings = {
  notes: NotesSettings;
  localization: LocalizationSettings;
};

export type GetSettingsResponse = {
  data: string; // stringified Settings
};
