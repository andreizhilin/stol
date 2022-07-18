import { NotesSettings } from '@/features';

export type Settings = {
  notes: NotesSettings;
};

export type GetSettingsResponse = {
  data: string; // stringified Settings
};
