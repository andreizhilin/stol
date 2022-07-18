import { AppearanceSettings, NotesSettings, LocalizationSettings } from '@/features';

export type Settings = {
  appearance: AppearanceSettings;
  notes: NotesSettings;
  localization: LocalizationSettings;
};

export type GetSettingsResponse = {
  data: string; // stringified Settings
};
