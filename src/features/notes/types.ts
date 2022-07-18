export type Note = {
  id: string;
  date: Date;
  text: string;
};

export type FetchNotesResponse = {
  data: Note[];
};

export type GetNoteByDateResponse = {
  data: Note;
};

export type NotesSettings = {
  isAutoSaveEnabled: boolean;
};
