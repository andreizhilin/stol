export type Note = {
  date: Date;
  text: string;
};

export type FetchNotesResponse = {
  data: Note[];
};

export type GetNoteByDateResponse = {
  data: Note;
};
