import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { Datepicker, Editor, SaveButton, Spinner } from '@/components';

import { useGetNoteByDateQuery, useUpdateNoteMutation } from './api';

const DEFAULT_SELECTED_DATE = new Date();
const DEFAULT_CHANGED_NOTE = undefined;
const DEFAULT_IS_PRISTINE = true;
const DEFAULT_IS_EDITOR_READY = false;

export function NotepadPage() {
  const [selectedDate, setSelectedDate] = useState(DEFAULT_SELECTED_DATE);
  const [changedNote, setChangedNote] = useState<string | undefined>(DEFAULT_CHANGED_NOTE);
  const [isPristine, setIsPristine] = useState(DEFAULT_IS_PRISTINE);
  const [isEditorReady, setIsEditorReady] = useState(DEFAULT_IS_EDITOR_READY);
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();
  const { data, isFetching, refetch } = useGetNoteByDateQuery(dayjs(selectedDate).format('YYYY-MM-DD'));

  const saveNote = useCallback(() => {
    updateNote({
      id: data?.id ?? '',
      date: selectedDate,
      text: changedNote ?? '',
    });
    setIsPristine(true);
  }, [data?.id, changedNote, selectedDate, updateNote]);

  const handleDateChange = useCallback((date: Date) => {
    setIsPristine(DEFAULT_IS_PRISTINE);
    setSelectedDate(date);
    setIsEditorReady(DEFAULT_IS_EDITOR_READY);
    setChangedNote(DEFAULT_CHANGED_NOTE);
  }, []);

  const handleEditorChange = useCallback((note: string) => {
    setIsPristine(false);
    setChangedNote(note);
  }, []);

  const handleEditorReady = useCallback(() => {
    setIsEditorReady(true);
  }, []);

  const handleSaveClick = useCallback(() => {
    saveNote();
  }, [saveNote]);

  useEffect(() => {
    if (selectedDate) {
      refetch();
    }
  }, [selectedDate, refetch]);

  return (
    <div data-test='notepad-page' className='flex w-full max-w-screen-md'>
      <div className='w-full p-5 text-lg'>
        <div className='flex justify-center font-bold md:pb-5'>
          {isEditorReady && <Datepicker value={selectedDate} onChange={handleDateChange} />}
          {!isPristine && <SaveButton onClick={handleSaveClick} />}
          {(isUpdating || isFetching) && <Spinner />}
        </div>
        {!isFetching && (
          <Editor
            value={data?.text}
            onChange={handleEditorChange}
            onReady={handleEditorReady}
            onPressCtrlS={saveNote}
          />
        )}
      </div>
    </div>
  );
}
