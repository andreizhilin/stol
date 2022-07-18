import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { AiFillSave } from 'react-icons/ai';

import { Datepicker, BaseLayout, Spinner } from '@/components';
import { useInterval } from '@/services';

import { useGetNoteByDateQuery, useGetNotesSettingsQuery, useUpdateNoteMutation } from '../hooks';
import { NotepadWidget } from '../components';

const DEFAULT_SELECTED_DATE = new Date();
const DEFAULT_CHANGED_NOTE = undefined;
const DEFAULT_LAST_CHANGE_DATE = new Date();
const DEFAULT_IS_PRISTINE = true;
const DEFAULT_IS_NOTEPAD_READY = false;
const AUTO_SAVE_INTERVAL_SECONDS = 10;

export function NotepadPage() {
  const [selectedDate, setSelectedDate] = useState(DEFAULT_SELECTED_DATE);
  const [lastChangeDate, setLastChangeDate] = useState(DEFAULT_LAST_CHANGE_DATE);
  const [changedNoteText, setChangedNoteText] = useState<string | undefined>(DEFAULT_CHANGED_NOTE);
  const [isPristine, setIsPristine] = useState(DEFAULT_IS_PRISTINE);
  const [isNotepadReady, setIsNotepadReady] = useState(DEFAULT_IS_NOTEPAD_READY);
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();
  const { data, isFetching, refetch } = useGetNoteByDateQuery(dayjs(selectedDate).format('YYYY-MM-DD'));
  const { data: notesSettings } = useGetNotesSettingsQuery();

  const saveNote = useCallback(() => {
    updateNote({
      id: data?.id ?? '',
      date: selectedDate,
      text: changedNoteText ?? '',
    });
    setIsPristine(true);
  }, [changedNoteText, data?.id, selectedDate, updateNote]);

  useEffect(() => {
    if (selectedDate) {
      refetch();
    }
  }, [refetch, selectedDate]);

  const handleDateChange = useCallback((date: Date) => {
    setIsPristine(DEFAULT_IS_PRISTINE);
    setSelectedDate(date);
    setIsNotepadReady(DEFAULT_IS_NOTEPAD_READY);
    setChangedNoteText(DEFAULT_CHANGED_NOTE);
  }, []);

  const handleNotepadChange = useCallback((note: string) => {
    setIsPristine(false);
    setLastChangeDate(new Date());
    setChangedNoteText(note);
  }, []);

  const handleNotepadReady = useCallback(() => {
    setIsNotepadReady(true);
  }, []);

  useInterval(() => {
    if (isPristine) return;
    if (!notesSettings?.isAutoSaveEnabled) return;
    if (dayjs().diff(dayjs(lastChangeDate), 'second') < AUTO_SAVE_INTERVAL_SECONDS) return;

    saveNote();
  }, AUTO_SAVE_INTERVAL_SECONDS * 1000);

  return (
    <BaseLayout
      toolbar={
        <div className='flex'>
          {!isPristine && (
            <div data-test='notepad-save-button' className='ml-2 cursor-pointer' onClick={saveNote}>
              <AiFillSave size='24' />
            </div>
          )}
          {(isUpdating || isFetching) && (
            <div className='ml-2'>
              <Spinner />
            </div>
          )}
        </div>
      }
    >
      <div data-test='notepad-page' className='flex flex-col w-full max-w-screen-md p-5'>
        <div className='flex justify-center font-bold pb-5'>
          {isNotepadReady && (
            <div className='justify-self-center'>
              <Datepicker value={selectedDate} onChange={handleDateChange} />
            </div>
          )}
        </div>
        <NotepadWidget
          date={selectedDate}
          onChange={handleNotepadChange}
          onReady={handleNotepadReady}
          onPressCtrlS={saveNote}
        />
      </div>
    </BaseLayout>
  );
}
