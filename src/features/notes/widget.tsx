import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { Datepicker, Editor, SaveButton, Spinner } from '@/components';
import { useInterval } from '@/hooks';

import { useGetNoteByDateQuery, useGetNotesSettingsQuery, useUpdateNoteMutation } from './hooks';

const DEFAULT_SELECTED_DATE = new Date();
const DEFAULT_CHANGED_NOTE = undefined;
const DEFAULT_LAST_CHANGE_DATE = new Date();
const DEFAULT_IS_PRISTINE = true;
const DEFAULT_IS_EDITOR_READY = false;
const AUTO_SAVE_INTERVAL_SECONDS = 10;

export function NotepadWidget() {
  const [selectedDate, setSelectedDate] = useState(DEFAULT_SELECTED_DATE);
  const [lastChangeDate, setLastChangeDate] = useState(DEFAULT_LAST_CHANGE_DATE);
  const [changedNoteText, setChangedNoteText] = useState<string | undefined>(DEFAULT_CHANGED_NOTE);
  const [isPristine, setIsPristine] = useState(DEFAULT_IS_PRISTINE);
  const [isEditorReady, setIsEditorReady] = useState(DEFAULT_IS_EDITOR_READY);
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();
  const { data, isFetching, refetch } = useGetNoteByDateQuery(dayjs(selectedDate).format('YYYY-MM-DD'));
  const { data: notesSettings, isFetching: areSettingsLoading } = useGetNotesSettingsQuery();

  const saveNote = useCallback(() => {
    updateNote({
      id: data?.id ?? '',
      date: selectedDate,
      text: changedNoteText ?? '',
    });
    setIsPristine(true);
  }, [changedNoteText, data?.id, selectedDate, updateNote]);

  const handleDateChange = useCallback((date: Date) => {
    setIsPristine(DEFAULT_IS_PRISTINE);
    setSelectedDate(date);
    setIsEditorReady(DEFAULT_IS_EDITOR_READY);
    setChangedNoteText(DEFAULT_CHANGED_NOTE);
  }, []);

  const handleEditorChange = useCallback((note: string) => {
    setIsPristine(false);
    setLastChangeDate(new Date());
    setChangedNoteText(note);
  }, []);

  const handleEditorReady = useCallback(() => {
    setIsEditorReady(true);
  }, []);

  useInterval(() => {
    if (isPristine) return;
    if (!notesSettings?.isAutoSaveEnabled) return;
    if (dayjs().diff(dayjs(lastChangeDate), 'second') < AUTO_SAVE_INTERVAL_SECONDS) return;

    saveNote();
  }, AUTO_SAVE_INTERVAL_SECONDS * 1000);

  useEffect(() => {
    if (selectedDate) {
      refetch();
    }
  }, [refetch, selectedDate]);

  return (
    <div data-test='notepad-widget' className='flex w-full max-w-screen-md'>
      <div className='w-full p-5 text-lg'>
        <div className='flex justify-center font-bold md:pb-5'>
          {isEditorReady && <Datepicker value={selectedDate} onChange={handleDateChange} />}
          {!isPristine && <SaveButton onClick={saveNote} />}
          {(isUpdating || isFetching) && (
            <div className='ml-2'>
              <Spinner />
            </div>
          )}
        </div>
        {!isFetching && !areSettingsLoading && (
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
