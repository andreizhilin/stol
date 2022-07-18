import dayjs from 'dayjs';

import { Editor } from '@/components';

import { useGetNoteByDateQuery, useGetNotesSettingsQuery } from '../hooks';

type Props = {
  date: Date;

  onChange?: (note: string) => void;
  onReady?: () => void;
  onPressCtrlS?: () => void;
};

export function NotepadWidget({ date, onChange, onReady, onPressCtrlS }: Props) {
  const { data, isFetching } = useGetNoteByDateQuery(dayjs(date).format('YYYY-MM-DD'));
  const { isFetching: areSettingsLoading } = useGetNotesSettingsQuery();

  return (
    <div data-test='notepad-widget' className='text-lg'>
      {!isFetching && !areSettingsLoading && (
        <Editor value={data?.text} onChange={onChange} onReady={onReady} onPressCtrlS={onPressCtrlS} />
      )}
    </div>
  );
}
