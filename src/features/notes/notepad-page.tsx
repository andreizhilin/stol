import { useCallback, useState } from 'react';
import dayjs from 'dayjs';

import { Editor, Page, SaveButton, Spinner } from '@/components';

import { useGetNoteByDateQuery, useUpdateNoteMutation } from './api';

export function NotepadPage() {
  const [selectedDate] = useState(new Date());
  const { data, isLoading } = useGetNoteByDateQuery(dayjs(selectedDate).format('YYYY-MM-DD'));
  const [note, setNote] = useState(data?.text);
  const [isPristine, setIsPristine] = useState(true);
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();

  const saveNote = useCallback(() => {
    updateNote({
      date: selectedDate,
      text: note ?? '',
    });
    setIsPristine(true);
  }, [note, selectedDate, updateNote]);

  const handleChangeEditor = useCallback(
    (changedNote: string) => {
      setIsPristine(false);
      setNote(changedNote);
    },
    [setIsPristine],
  );

  const handleClickSave = useCallback(() => {
    saveNote();
  }, [saveNote]);

  return (
    <Page>
      <div data-test='notepad-page' className='flex w-full max-w-screen-md p-5'>
        <div className='w-full shadow bg-white p-5 md:p-10'>
          <div className='flex justify-center font-bold md:pb-5 '>
            {dayjs(selectedDate).format('D MMMM YYYY')}
            {!isPristine && <SaveButton onClick={handleClickSave} />}
            {(isLoading || isUpdating) && <Spinner />}
          </div>
          {!isLoading && <Editor value={data?.text} onChange={handleChangeEditor} onPressCtrlS={saveNote} />}
        </div>
      </div>
    </Page>
  );
}
