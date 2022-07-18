import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { ButtonGroup, LoadingButton } from '@atlaskit/button';

import { BaseLayout, DatePickerButton } from '@/components';
import { useInterval } from '@/services';
import { useLocalization } from '@/features';

import { useGetNoteByDateQuery, useGetNotesSettingsQuery, useUpdateNoteMutation } from '../hooks';
import { NotepadWidget } from '../components';
import { localization } from '../localization';
import { NotepadPageSkeleton } from './notepad-page-skeleton';

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
  const { t, dateFormat } = useLocalization(localization);

  const saveNote = useCallback(() => {
    if (isPristine) return;
    updateNote({
      id: data?.id ?? '',
      date: selectedDate,
      text: changedNoteText ?? '',
    });
    setIsPristine(true);
  }, [changedNoteText, data?.id, selectedDate, updateNote, isPristine]);

  useEffect(() => {
    if (selectedDate) {
      refetch();
    }
  }, [refetch, selectedDate]);

  const handleDateChange = useCallback((date: Date) => {
    setIsPristine(true);
    setSelectedDate(date);
    setIsNotepadReady(false);
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
    if (!notesSettings?.isAutoSaveEnabled) return;
    if (dayjs().diff(dayjs(lastChangeDate), 'second') < AUTO_SAVE_INTERVAL_SECONDS) return;

    saveNote();
  }, AUTO_SAVE_INTERVAL_SECONDS * 1000);

  return (
    <BaseLayout>
      <div data-testid='notepad-page' className='flex flex-col w-full max-w-screen-md p-5 md:ml-40'>
        {isNotepadReady ? (
          <div className='my-8'>
            <div className='mb-4 text-2xl'>{dayjs(selectedDate).format(dateFormat)}</div>
            <ButtonGroup>
              <DatePickerButton selectedDate={selectedDate} onSelect={handleDateChange} label={t('SelectDate')} />
              <LoadingButton
                testId='save-button'
                isLoading={isUpdating || isFetching}
                isDisabled={isPristine}
                appearance='primary'
                onClick={saveNote}
              >
                {t('Save')}
              </LoadingButton>
            </ButtonGroup>
          </div>
        ) : (
          <NotepadPageSkeleton />
        )}
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
