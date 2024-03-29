import React from 'react';
import dayjs from 'dayjs';

import { Editor } from '@/components';

import { useGetNoteByDateQuery } from '../hooks';

type Props = {
  date: Date;

  onChange?: (note: string) => void;
  onReady?: () => void;
  onPressCtrlS?: () => void;
};

export function Notepad({ date, onChange, onReady, onPressCtrlS }: Props) {
  const { data, isFetching } = useGetNoteByDateQuery(dayjs(date).format('YYYY-MM-DD'));

  return (
    <div data-testid='notepad' className='text-lg border py-8 px-10'>
      {!isFetching && <Editor value={data?.text} onChange={onChange} onReady={onReady} onPressCtrlS={onPressCtrlS} />}
    </div>
  );
}
